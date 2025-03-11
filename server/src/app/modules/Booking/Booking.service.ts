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

const getAllBookings = async () => {
  return await Booking.find({});
};

export const getUserBookings = async (userId: string) => {
  const user = await User.find({ _id: userId });

  if (user[0].role === UserRole.STUDENT) {
    return await Booking.find({ studentId: userId });
  } else {
    return await Booking.find({ tutorId: userId });
  }
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
