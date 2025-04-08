import mongoose from "mongoose";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import User from "../User/User.model";
import { UserRole } from "../User/User.interface";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import { BookingStatus, CanceledBy } from "./booking.constant";
import { LessonRequest } from "../lessonRequest/lessonRequest.model";
import QueryBuilder from "../../builder/QueryBilder";

const createBooking = async (
  payload: Partial<IBooking>,
  session?: mongoose.ClientSession
) => {
  const [newBooking] = await Booking.create(
    [payload],
    session ? { session } : {}
  );
  return newBooking;
};

const getAllBookings = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(Booking.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingQuery.modelQuery;
  const meta = await bookingQuery.countTotal();

  return { result, meta };
};

export const getUserBookings = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const bookingQuery = new QueryBuilder(Booking.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const matchStage =
    user.role === UserRole.STUDENT
      ? { studentId: user._id }
      : { tutorId: user._id };

  const aggregatePipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "users",
        localField: "studentId",
        foreignField: "_id",
        as: "student",
      },
    },
    { $unwind: "$student" },
    {
      $lookup: {
        from: "users",
        localField: "tutorId",
        foreignField: "_id",
        as: "tutor",
      },
    },
    { $unwind: "$tutor" },
    {
      $project: {
        _id: 1,
        type: 1,
        subject: 1,
        sessionDate: 1,
        sessionStart: 1,
        sessionEnd: 1,
        bookingStatus: 1,
        paymentStatus: 1,
        "student.name": 1,
        "student.classLevel": 1,
        "tutor.name": 1,
      },
    },
  ];

  const queryFilter = bookingQuery.modelQuery.getFilter();
  if (Object.keys(queryFilter).length > 0) {
    aggregatePipeline.push({ $match: queryFilter as any }); // Add filter stage with type assertion
  }

  if (typeof query?.sort === "string") {
    const sort = query.sort.split(",").join(" ") || "-createdAt";
    aggregatePipeline.push({ $sort: { [sort]: 1 } } as any);
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 5;
  const skip = (page - 1) * limit;
  aggregatePipeline.push({ $skip: skip } as any, { $limit: limit } as any);

  const result = await Booking.aggregate(aggregatePipeline);

  const meta = await bookingQuery.countTotal();

  return { result, meta };
};

export const getUserUpcomingBookings = async (userId: string) => {
  const now = new Date();

  const upcomingBookings = await Booking.find({
    studentId: userId,
    sessionStart: { $gte: now },
  }).sort({ sessionStart: 1 });

  return upcomingBookings;
};

export const cancelBooking = async (
  bookingId: string,
  userInfo: JwtPayload,
  reason?: string
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(bookingId).session(session);
    if (!booking) {
      throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
    }

    if (booking.isCancelled) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "This booking is already canceled!"
      );
    }

    if (userInfo.role === UserRole.STUDENT) {
      booking.isCancelled = true;
      booking.canceledBy = CanceledBy.STUDENT;
      booking.cancelReason = reason || null;
      booking.bookingStatus = BookingStatus.CANCELLED;
      booking.cancellationTime = new Date();
    } else if (userInfo.role === UserRole.TUTOR) {
      booking.isCancelled = true;
      booking.canceledBy = CanceledBy.TUTOR;
      booking.cancelReason = reason || null;
      booking.bookingStatus = BookingStatus.CANCELLED;
      booking.cancellationTime = new Date();
    } else {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "You are not authorized to cancel this booking!"
      );
    }

    await booking.save({ session });

    if (booking.lessonRequestId) {
      const lessonRequest = await LessonRequest.findById(
        booking.lessonRequestId
      ).session(session);

      if (lessonRequest) {
        lessonRequest.status = "cancelled";
        await lessonRequest.save({ session });
      }
    }

    await session.commitTransaction();
    session.endSession();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getUserBookings,
  getUserUpcomingBookings,
  cancelBooking,
};
