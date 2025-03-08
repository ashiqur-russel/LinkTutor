import mongoose, { Schema, Model } from "mongoose";
import { IBooking } from "./booking.interface";
import { BookingStatus, CanceledBy } from "./booking.constant";

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
  subject: { type: String, required: true },
  sessionDate: { type: Date, required: true },
  sessionStart: { type: Date },
  sessionEnd: { type: Date },
  isCancelled: { type: Boolean, default: false },
  canceledBy: {
    type: String,
    enum: Object.values(CanceledBy),
    default: CanceledBy.NONE,
  },
  cancelReason: { type: String, default: null },
  bookingStatus: {
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.ACTIVE,
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Booking: Model<IBooking> = mongoose.model<IBooking>(
  "Booking",
  BookingSchema
);
