import mongoose from "mongoose";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import User from "../User/User.model";
import { UserRole } from "../User/User.interface";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import { BookingStatus, CanceledBy } from "./booking.constant";

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
  const booking = await Booking.findById({ _id: bookingId });

  if (!booking) {
    throw new Error("Booking not found");
  }

  console.log(booking);
  console.log(userInfo.role);

  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
  }

  if (userInfo.role === UserRole.STUDENT) {
    console.log("canceeled by student");

    booking.isCancelled = true;
    booking.canceledBy = CanceledBy.STUDENT;
    booking.cancelReason = reason || null;
    booking.bookingStatus = BookingStatus.CANCELLED;
  } else if (userInfo.role === UserRole.TUTOR) {
    console.log("canceeled by TUTOR");
    booking.isCancelled = true;
    booking.canceledBy = CanceledBy.TUTOR;
    booking.cancelReason = reason || null;
    booking.bookingStatus = BookingStatus.CANCELLED;
  } else {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to cancel this booking!"
    );
  }

  await booking.save();

  return booking;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getUserBookings,
  getUserUpcomingBookings,
  cancelBooking,
};
