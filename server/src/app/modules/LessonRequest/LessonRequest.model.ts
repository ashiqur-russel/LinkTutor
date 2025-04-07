import mongoose, { Schema, Model } from "mongoose";
import { ILessonRequest } from "./lessonRequest.interface";
import { BookingType } from "../booking/booking.constant";

const LessonRequestSchema: Schema<ILessonRequest> = new Schema({
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
  status: {
    type: String,
    enum: ["pending", "accepted", "cancelled", "declined"],
    default: "pending",
  },
  type: { type: String, default: BookingType.REQUEST },

  subject: { type: String, required: true },
  paymentIntentId: { type: String, required: false },
  paymentStatus: {
    type: String,
    enum: ["hold", "paid", "cancelled", "failed"],
    required: false,
  },
  duration: { type: Schema.Types.Mixed, required: true },
  sessionDate: { type: Date, required: true },
  sessionStart: { type: Date, required: true },
  sessionEnd: { type: Date, required: true },
  isAccepted: { type: Boolean, default: false },
  isDeclined: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const LessonRequest: Model<ILessonRequest> =
  mongoose.model<ILessonRequest>("LessonRequest", LessonRequestSchema);
