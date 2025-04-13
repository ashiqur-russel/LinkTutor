import mongoose, { Schema, Model } from "mongoose";
import { IBooking } from "./booking.interface";
import {
  BookingStatus,
  BookingType,
  CanceledBy,
  PaymentStatus,
} from "./booking.constant";

const BookingSchema: Schema<IBooking> = new Schema({
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lessonOfferId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LessonOffer",
    default: null,
  },
  lessonRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LessonRequest",
    default: null,
  },
  type: { type: String, default: BookingType.BOOKING },
  subject: { type: String, required: true },
  sessionDate: { type: Date, required: true },
  sessionStart: { type: Date },
  sessionEnd: { type: Date },
  isCancelled: { type: Boolean, default: false },
  canceledBy: {
    type: String,
    enum: Object.values(CanceledBy),
    default: null,
  },
  cancelReason: { type: String, default: null },
  cancellationTime: { type: Date, required: false },
  bookingStatus: {
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.ACTIVE,
  },
  reviewGiven: { type: Boolean, default: false },

  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    default: null,
  },
  paymentStatus: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.UNPAID,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Booking: Model<IBooking> = mongoose.model<IBooking>(
  "Booking",
  BookingSchema
);
