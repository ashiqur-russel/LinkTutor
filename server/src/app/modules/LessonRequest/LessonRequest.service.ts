// lessonRequest.service.ts

import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { ILessonRequest } from "./lessonRequest.interface";
import { LessonRequest } from "./lessonRequest.model";
import { UserRole } from "../User/User.interface";
import Tutor from "../Tutor/Tutor.model";
import Student from "../Student/Student.model";
import { checkTimeslotAvailability } from "../../utils/timeslot.utils";
import {
  getUTCMinutes,
  getUtcWeekdayName,
  parseTimeToMinutes,
} from "./lessonRequest.utils";
import User from "../User/User.model";
import { format } from "date-fns";

/**
 * createLessonRequest:
 * 1. Ensures the tutor and student exist and are active.
 * 2. Validates the requested date/time is in the future and within the tutor’s availability.
 * 3. Checks for overlapping or duplicate requests.
 * 4. Allows only 1-hour or 2-hour sessions (exactly 60 or 120 minutes).
 */
const createLessonRequest = async (payload: ILessonRequest) => {
  // Debug prints for verifying date/time
  const testDate = new Date("2025-03-08T00:00:00.000Z");
  console.log(
    "DEBUG testDate => UTC:",
    testDate.toUTCString(),
    "Local:",
    testDate.toString()
  );

  console.log("DEBUG sessionDate =>", payload.sessionDate);
  console.log(
    "DEBUG sessionDate toUTCString =>",
    new Date(payload.sessionDate).toUTCString()
  );
  console.log(
    "DEBUG sessionDate getUTCDay =>",
    new Date(payload.sessionDate).getUTCDay()
  );

  const tutorUser = await Tutor.findById(payload.tutorId);
  if (!tutorUser || tutorUser.role !== UserRole.TUTOR) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Tutor does not exist or is not active!"
    );
  }

  const studentUser = await Student.findById(payload.studentId);
  if (!studentUser || studentUser.role !== UserRole.STUDENT) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Student does not exist or is not active!"
    );
  }

  // sessionStart/sessionEnd to Date objects (UTC)
  const sessionStart = new Date(payload.sessionStart); // e.g. "2025-03-08T09:00:00.000Z"
  const sessionEnd = new Date(payload.sessionEnd); // e.g. "2025-03-08T11:00:00.000Z"

  // Check that the session is in the future
  const now = new Date();
  if (sessionStart <= now) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Cannot request a lesson in the past or at the current time."
    );
  }

  // Ensure sessionEnd is strictly after sessionStart
  if (sessionEnd <= sessionStart) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "sessionEnd must be after sessionStart."
    );
  }

  // Tutor’s weekday availability (in UTC).  e.g. "Saturday"
  const requestedDate = new Date(payload.sessionDate);
  const requestedWeekday = getUtcWeekdayName(requestedDate);

  // Find an availability entry for that weekday
  const dayAvailability = tutorUser.availability?.find(
    (slot) => slot.day === requestedWeekday
  );
  if (!dayAvailability) {
    console.log("DEBUG no availability =>", requestedWeekday);
    throw new AppError(
      StatusCodes.CONFLICT,
      `Tutor is not available on ${requestedWeekday}.`
    );
  }

  // Convert the availability times (e.g. "09:00") to minutes from midnight (UTC)
  const avStartMins = parseTimeToMinutes(dayAvailability.startTime); // "09:00" => 540
  const avEndMins = parseTimeToMinutes(dayAvailability.endTime); // "11:00" => 660

  // Convert the session times to total UTC minutes from midnight
  const requestedStartMins = getUTCMinutes(sessionStart); // e.g., 09:00 UTC => 540
  const requestedEndMins = getUTCMinutes(sessionEnd); // e.g., 11:00 UTC => 660

  console.log("DEBUG Time comparison =>", {
    avStartMins,
    avEndMins,
    requestedStartMins,
    requestedEndMins,
  });

  // If the requested time is outside [avStartMins, avEndMins], reject
  if (requestedStartMins < avStartMins || requestedEndMins > avEndMins) {
    const sessionStartStr = format(sessionStart, "HH:mm");
    const sessionEndStr = format(sessionEnd, "HH:mm");

    throw new AppError(
      StatusCodes.CONFLICT,
      `Tutor not available for requested slot: ${sessionStartStr} - ${sessionEndStr} on ${requestedWeekday}.`
    );
  }

  // Check if the tutor has the requested subject
  if (!tutorUser.subjects?.includes(payload.subject)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Tutor does not teach the subject '${payload.subject}'.`
    );
  }

  // Check actual session length => must be exactly 60 or 120 minutes
  const sessionDiffMins = requestedEndMins - requestedStartMins; // e.g. 540->600 => 60 mins
  if (sessionDiffMins !== 60 && sessionDiffMins !== 120) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      "Session must be exactly 1 hour or 2 hours!"
    );
  }

  // Prevent multiple requests from same student in the same timeslot
  //    (unless prior was declined)
  const existingStudentActiveRequest = await LessonRequest.findOne({
    studentId: payload.studentId,
    status: { $ne: "declined" },
    sessionDate: payload.sessionDate,
    $or: [
      {
        sessionStart: { $lt: payload.sessionEnd },
        sessionEnd: { $gt: payload.sessionStart },
      },
    ],
  });
  if (existingStudentActiveRequest) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "You already have an active lesson request for this timeslot!"
    );
  }

  // Check if there's already a request with the same tutor, subject, date, overlapping times
  const existingTutorRequest = await LessonRequest.findOne({
    tutorId: payload.tutorId,
    studentId: payload.studentId,
    subject: payload.subject,
    sessionDate: payload.sessionDate,
    $or: [
      {
        sessionStart: { $lt: payload.sessionEnd },
        sessionEnd: { $gt: payload.sessionStart },
      },
    ],
  });
  if (existingTutorRequest) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "You already have a request for this subject and timeslot with this tutor!"
    );
  }

  // Timeslot availability for the tutor (Bookings) => partial booking logic
  const isTutorSlotAvailable = await checkTimeslotAvailability({
    userId: payload.tutorId,
    role: UserRole.TUTOR,
    sessionDate: payload.sessionDate,
    sessionStart: payload.sessionStart,
    sessionEnd: payload.sessionEnd,
  });
  if (!isTutorSlotAvailable) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Tutor timeslot is not available!"
    );
  }

  // Timeslot availability for the student (Bookings)
  const isStudentSlotAvailable = await checkTimeslotAvailability({
    userId: payload.studentId,
    role: UserRole.STUDENT,
    sessionDate: payload.sessionDate,
    sessionStart: payload.sessionStart,
    sessionEnd: payload.sessionEnd,
  });
  if (!isStudentSlotAvailable) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Student timeslot is not available!"
    );
  }

  const result = await LessonRequest.create(payload);
  return result;
};

const getAllLessonRequests = async () => {
  return LessonRequest.find({});
};

const getLessonRequestById = async (id: string) => {
  return LessonRequest.findById(id);
};

// Retrieve all lesson requests for the current user (student or tutor)
const getMyLessonRequest = async (userId: string) => {
  const user = await (User as any).checkUserExist(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist!");
  }

  if (user.role === UserRole.STUDENT) {
    return LessonRequest.find({ studentId: userId });
  } else if (user.role === UserRole.TUTOR) {
    return LessonRequest.find({ tutorId: userId });
  }
};

export const LessonRequestServices = {
  createLessonRequest,
  getAllLessonRequests,
  getLessonRequestById,
  getMyLessonRequest,
};
