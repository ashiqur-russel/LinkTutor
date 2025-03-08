import mongoose from "mongoose";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";

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

export const bookingServices = { createBooking };
