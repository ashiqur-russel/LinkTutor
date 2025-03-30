// lessonOffer.model.ts
import mongoose, { Schema, Model } from "mongoose";
import { ILessonOffer } from "./lessonOffer.interface";
import { BookingType } from "../booking/booking.constant";

const LessonOfferSchema: Schema<ILessonOffer> = new Schema({
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
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  type: { type: String, default: BookingType.OFFER },
  subject: { type: String, required: true },
  duration: { type: Schema.Types.Mixed, required: true },
  sessionDate: { type: Date, required: true },
  sessionStart: { type: Date, required: true },
  sessionEnd: { type: Date, required: true },
  isDeclined: { type: Boolean, default: false },
  isAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const LessonOffer: Model<ILessonOffer> = mongoose.model<ILessonOffer>(
  "LessonOffer",
  LessonOfferSchema
);
