// lessonRequest.service.ts
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { ILessonRequest } from "./lessonRequest.interface";
import { LessonRequest } from "./lessonRequest.model";
import { UserRole } from "../User/User.interface";
import User from "../User/User.model";
import { checkTimeslotAvailability } from "../../utils/timeslot.utils";

const createLessonRequest = async (payload: ILessonRequest) => {
  // 1. Ensure the tutor exists and is active
  const tutorUser = await (User as any).checkUserExist(payload.tutorId);

  if (tutorUser && tutorUser.role !== UserRole.TUTOR) {
    throw new AppError(StatusCodes.NOT_FOUND, "Tutor does not exist!");
  }

  const studentUser = await User.checkUserExist(payload.studentId);

  if (studentUser && studentUser.role !== UserRole.STUDENT) {
    throw new AppError(StatusCodes.NOT_FOUND, "Student does not exist!");
  }

  //  Check if the tutor has the requested subject
  //    e.g. ["English", "Math", "Science"]
  if (!tutorUser.subjects?.includes(payload.subject)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Tutor does not teach the subject '${payload.subject}'.`
    );
  }

  //  Check for an existing LessonRequest with the same timeslot, subject, etc.
  const existingRequest = await LessonRequest.findOne({
    tutorId: payload.tutorId,
    subject: payload.subject,
    sessionDate: payload.sessionDate,
    $or: [
      {
        sessionStart: { $lt: payload.sessionEnd },
        sessionEnd: { $gt: payload.sessionStart },
      },
    ],
  });

  if (existingRequest) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "You already have a request for this subject and timeslot!"
    );
  }

  // Check timeslot for the tutor
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

  //  Check timeslot for the student
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

  //  Validate duration (must be 1 or 2 hours)
  const numericDuration = Number(payload.duration);
  if (numericDuration < 1 || numericDuration > 2) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      "Duration must be between 1 and 2 hours."
    );
  }

  const result = await LessonRequest.create(payload);
  return result;
};

const getAllLessonRequests = async () => {
  return LessonRequest.find({});
};

const getMyLessonRequest = async (userId: string) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist!");
  }

  if (user.role === UserRole.STUDENT) {
    return await LessonRequest.find({ studentId: userId });
  }
  if (user.role === UserRole.TUTOR) {
    return await LessonRequest.find({ tutorId: userId });
  }
};

const getLessonRequestById = async (id: string) => {
  console.log(id);
};

export const LessonRequestServices = {
  createLessonRequest,
  getAllLessonRequests,
  getLessonRequestById,
  getMyLessonRequest,
};
