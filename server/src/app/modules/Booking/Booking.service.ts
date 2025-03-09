import mongoose from "mongoose";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import User from "../User/User.model";
import { UserRole } from "../User/User.interface";

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

export const bookingServices = {
  createBooking,
  getAllBookings,
  getUserBookings,
  getUserUpcomingBookings,
};
