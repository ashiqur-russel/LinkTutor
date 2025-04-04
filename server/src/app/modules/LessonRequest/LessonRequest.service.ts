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
import { Booking } from "../booking/booking.model";
import mongoose, { Types } from "mongoose";
import { bookingServices } from "../booking/booking.service";
import QueryBuilder from "../../builder/QueryBilder";

/**
 * createLessonRequest:
 * 1. Tutor & student must exist and be active.
 * 2. Requested timeslot must be in the future and within tutor's availability.
 * 3. Only 1-hour or 2-hour sessions are allowed (60 or 120 minutes).
 * 4. If any existing request (pending, accepted, or declined) overlaps the same timeslot,
 *    block the new request.
 */
const createLessonRequest1 = async (payload: ILessonRequest) => {
  // 1. Tutor must exist & be active
  const tutorUser = await Tutor.findById(payload.tutorId);
  if (!tutorUser || tutorUser.role !== UserRole.TUTOR) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Tutor does not exist or is not active!"
    );
  }

  // Student must exist & be active
  const studentUser = await Student.findById(payload.studentId);
  if (!studentUser || studentUser.role !== UserRole.STUDENT) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Student does not exist or is not active!"
    );
  }

  // Convert sessionStart/sessionEnd to Date objects (UTC)
  const sessionStart = new Date(payload.sessionStart);
  const sessionEnd = new Date(payload.sessionEnd);

  // Must be in the future
  const now = new Date();
  if (sessionStart <= now) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Cannot request a lesson in the past or at the current time."
    );
  }
  // Must be strictly after sessionStart
  if (sessionEnd <= sessionStart) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "sessionEnd must be after sessionStart."
    );
  }

  // Check tutor’s weekday availability
  const requestedDate = new Date(payload.sessionDate);
  const requestedWeekday = getUtcWeekdayName(requestedDate);

  const dayAvailability = tutorUser.availability?.find(
    (slot) => slot.day === requestedWeekday
  );
  if (!dayAvailability) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `Tutor is not available on ${requestedWeekday}.`
    );
  }

  // Convert availability to minutes from midnight (UTC) / e.g. "11:00" => 660
  const avStartMins = parseTimeToMinutes(dayAvailability.startTime);
  const avEndMins = parseTimeToMinutes(dayAvailability.endTime);

  // Convert the session times to total UTC minutes
  const requestedStartMins = getUTCMinutes(sessionStart);
  const requestedEndMins = getUTCMinutes(sessionEnd);

  // If the requested time is outside the tutor's availability
  if (requestedStartMins < avStartMins || requestedEndMins > avEndMins) {
    const sessionStartStr = format(sessionStart, "HH:mm");
    const sessionEndStr = format(sessionEnd, "HH:mm");
    throw new AppError(
      StatusCodes.CONFLICT,
      `Tutor not available for requested slot: ${sessionStartStr} - ${sessionEndStr} on ${requestedWeekday}.`
    );
  }

  //  Tutor must teach the requested subject
  if (!tutorUser.subjects?.includes(payload.subject)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Tutor does not teach the subject '${payload.subject}'.`
    );
  }

  // Session must be exactly 1 or 2 hours (60 or 120 min)
  const sessionDiffMins = requestedEndMins - requestedStartMins;
  if (sessionDiffMins !== 60 && sessionDiffMins !== 120) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      "Session must be exactly 1 hour or 2 hours!"
    );
  }

  // BLOCK if ANY existing request (pending, accepted, or declined)
  //    overlaps the same timeslot for the same student & tutor
  const overlappingRequest = await LessonRequest.findOne({
    tutorId: payload.tutorId,
    studentId: payload.studentId,
    sessionDate: payload.sessionDate,
    isDeclined: false,

    $or: [
      {
        sessionStart: { $lt: payload.sessionEnd },
        sessionEnd: { $gt: payload.sessionStart },
      },
    ],
  });
  if (overlappingRequest) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "A request or booking for this timeslot already exists "
    );
  }

  // Check timeslot availability for the tutor (Bookings) => partial booking logic
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

  // Check timeslot availability for the student (Bookings)
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

  // Finally, create the lesson request
  const result = await LessonRequest.create(payload);
  return result;
};

const createLessonRequest1111 = async (payload: ILessonRequest) => {
  try {
    console.log("1. Fetching tutor...");
    const tutorUser = await Tutor.findById(payload.tutorId);
    if (!tutorUser || tutorUser.role !== UserRole.TUTOR) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Tutor does not exist or is not active!"
      );
    }

    console.log("2. Fetching student...");
    const studentUser = await Student.findById(payload.studentId);
    if (!studentUser || studentUser.role !== UserRole.STUDENT) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Student does not exist or is not active!"
      );
    }

    // Normalize sessionStart and sessionEnd to remove milliseconds
    const sessionStart = new Date(payload.sessionStart);
    const sessionEnd = new Date(payload.sessionEnd);
    sessionStart.setSeconds(0, 0);
    sessionEnd.setSeconds(0, 0);

    console.log("3. Checking for overlapping requests...");

    // Check for overlapping session requests (ANY subject) where status is NOT "cancelled" or "declined"
    const existingRequest = await LessonRequest.findOne({
      tutorId: payload.tutorId,
      studentId: payload.studentId,
      status: { $in: ["pending", "accepted"] }, // Only block if status is pending or accepted
      $or: [
        {
          sessionStart: { $lt: sessionEnd },
          sessionEnd: { $gt: sessionStart },
        },
      ],
    });

    if (existingRequest) {
      throw new AppError(
        StatusCodes.CONFLICT,
        `You have already booked this time slot for another subject (${existingRequest.subject}).`
      );
    }

    console.log("4. No conflicts found. Creating new session...");
    // Proceed with request creation
    const result = await LessonRequest.create({
      ...payload,
      sessionStart,
      sessionEnd,
      duration:
        (sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60 * 60), // Convert ms to hours
    });

    return result;
  } catch (error) {
    console.error("Error creating lesson request:", error);
    throw error;
  }
};

const createLessonRequest = async (payload: ILessonRequest) => {
  try {
    console.log("1. Fetching tutor...");
    const tutorUser = await Tutor.findById(payload.tutorId);
    if (!tutorUser || tutorUser.role !== UserRole.TUTOR) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Tutor does not exist or is not active!"
      );
    }

    console.log("2. Fetching student...");
    const studentUser = await Student.findById(payload.studentId);
    if (!studentUser || studentUser.role !== UserRole.STUDENT) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Student does not exist or is not active!"
      );
    }

    const sessionStart = new Date(payload.sessionStart);
    const sessionEnd = new Date(payload.sessionEnd);
    sessionStart.setSeconds(0, 0);
    sessionEnd.setSeconds(0, 0);

    console.log("3. Checking for overlapping requests...");

    // Check for overlapping session requests for the same tutor, where status is "accepted" (for other students)
    const existingRequest = await LessonRequest.findOne({
      tutorId: payload.tutorId,
      status: "accepted",
      studentId: { $ne: payload.studentId }, // Ensure it's not the same student
      $or: [
        {
          sessionStart: { $lt: sessionEnd },
          sessionEnd: { $gt: sessionStart },
        },
      ],
    });

    if (existingRequest) {
      throw new AppError(
        StatusCodes.CONFLICT,
        `The tutor is already booked for this time slot by another student for a different subject.`
      );
    }

    console.log("4. No conflicts found. Creating new session...");
    // Proceed with request creation
    const result = await LessonRequest.create({
      ...payload,
      sessionStart,
      sessionEnd,
      duration:
        (sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60 * 60),
    });

    return result;
  } catch (error) {
    console.error("Error creating lesson request:", error);
    throw error;
  }
};

// Retrieve all lesson requests (admin/debugging)
const getAllLessonRequests = async (query: Record<string, unknown>) => {
  const lessonQuery = new QueryBuilder(LessonRequest.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await lessonQuery.modelQuery;
  const meta = await lessonQuery.countTotal();

  return { result, meta };
};

// Retrieve a single lesson request by ID
const getLessonRequestById = async (id: string) => {
  return LessonRequest.findById(id);
};

// Retrieve all lesson requests for the current user (student or tutor)
const getMyLessonRequest = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const user = await (User as any).checkUserExist(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist!");
  }

  let filter = {};
  if (user.role === UserRole.STUDENT) {
    filter = { studentId: userId };
  } else if (user.role === UserRole.TUTOR) {
    filter = { tutorId: userId };
  }

  const lessonQuery = new QueryBuilder(LessonRequest.find(filter), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await lessonQuery.modelQuery;
  const meta = await lessonQuery.countTotal();

  return { result, meta };
};

const getMyUpcomingLessonRequest = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const user = await (User as any).checkUserExist(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist!");
  }

  let filter = {};
  const currentDate = new Date();

  if (user.role === UserRole.STUDENT) {
    filter = { studentId: userId, sessionDate: { $gte: currentDate } };
  } else if (user.role === UserRole.TUTOR) {
    filter = { tutorId: userId, sessionDate: { $gte: currentDate } };
  }

  const lessonQuery = new QueryBuilder(LessonRequest.find(filter), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await lessonQuery.modelQuery;
  const meta = await lessonQuery.countTotal();

  return { result, meta };
};

/**
 * Tutor declines a lesson request by ID.
 * @param requestId The _id of the lesson request document
 * TODO: Validate tutor should be matched witht he request tutorID
 */
const declineLessonRequest = async (requestId: string) => {
  console.log("req id", requestId);
  const request = await LessonRequest.findById(requestId);
  console.log("req ", request);

  if (!request) {
    throw new AppError(StatusCodes.NOT_FOUND, "Lesson request not found!");
  }

  if (request.isDeclined) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "This request is already declined!"
    );
  }

  if (request.isAccepted) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Request is already accepted and cannot be declined!"
    );
  }

  request.isDeclined = true;
  request.status = "declined";
  await request.save();

  return request;
};

const cancelLessonRequest = async (requestId: string) => {
  const request = await LessonRequest.findById(requestId);

  if (!request) {
    throw new AppError(StatusCodes.NOT_FOUND, "Lesson request not found!");
  }

  if (request.status === "cancelled") {
    throw new AppError(
      StatusCodes.CONFLICT,
      "This request is already cancelled!"
    );
  }

  if (request.isAccepted) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Request is already accepted and cannot be cancelled!"
    );
  }

  request.status = "cancelled";
  await request.save();

  return request;
};

/**
 * Tutor accepts a lesson request:
 * - Validate the request is not declined or accepted
 * - Mark it isAccepted = true
 * - Create a booking doc (via createBooking)
 * - Use a transaction for atomicity
 */
export const acceptRequest = async (requestId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const request = await LessonRequest.findById(requestId).session(session);
    if (!request) {
      throw new AppError(StatusCodes.NOT_FOUND, "Lesson request not found!");
    }

    if (request.isDeclined) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "Cannot accept a request that is already declined!"
      );
    }
    if (request.isAccepted) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "This request is already accepted!"
      );
    }

    request.isAccepted = true;
    await request.save({ session });

    // Create a booking using the createBooking function
    const bookingPayload = {
      tutorId: request.tutorId,
      studentId: request.studentId,
      lessonRequestId: request._id as Types.ObjectId,
      subject: request.subject,
      sessionDate: request.sessionDate,
      sessionStart: request.sessionStart,
      sessionEnd: request.sessionEnd,
    };

    const booking = await bookingServices.createBooking(
      bookingPayload,
      session
    );

    await session.commitTransaction();
    session.endSession();

    return { request, booking };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const LessonRequestServices = {
  createLessonRequest,
  getAllLessonRequests,
  getLessonRequestById,
  getMyLessonRequest,
  declineLessonRequest,
  acceptRequest,
  getMyUpcomingLessonRequest,
  cancelLessonRequest,
};
