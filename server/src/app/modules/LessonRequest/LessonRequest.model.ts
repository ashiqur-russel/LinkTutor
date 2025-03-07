import mongoose, { Schema, Model } from "mongoose";
import { ILessonRequest } from "./lessonRequest.interface";

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
  subject: { type: String, required: true },
  duration: { type: Schema.Types.Mixed, required: true },
  sessionDate: { type: Date, required: true },
  sessionStart: { type: Date, required: true },
  sessionEnd: { type: Date, required: true },
  isAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const LessonRequest: Model<ILessonRequest> =
  mongoose.model<ILessonRequest>("LessonRequest", LessonRequestSchema);
