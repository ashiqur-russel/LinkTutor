import mongoose, { Schema, Model } from "mongoose";
import {
  BookingStatus,
  IBooking,
  IBookingSession,
  SessionStatus,
} from "./Booking.interface";

// Sub-schema for booking sessions.
const BookingSessionSchema: Schema<IBookingSession> = new Schema({
  sessionDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(SessionStatus),
    default: SessionStatus.PENDING,
  },
});

// Booking schema.
const BookingSchema: Schema<IBooking> = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
  packageStartDate: { type: Date, required: true },
  packageEndDate: { type: Date, required: true },
  packageHours: { type: Number, required: true },
  sessions: [BookingSessionSchema],
  status: {
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.ACTIVE,
  },
  isBookingCancelled: { type: Boolean, default: false },
  bookingCancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  cancellationReason: { type: String, default: null },
  cancellationTime: { type: Date, default: null },
  requestReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Booking: Model<IBooking> = mongoose.model<IBooking>(
  "Booking",
  BookingSchema
);
