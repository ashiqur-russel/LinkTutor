import mongoose, { Schema, Model } from "mongoose";
import { ILessonRequest } from "./LessonRequest.interface";

const LessonRequestSchema: Schema<ILessonRequest> = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
  subject: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  requestAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const LessonRequestModel: Model<ILessonRequest> =
  mongoose.model<ILessonRequest>("Request", LessonRequestSchema);

export default LessonRequestModel;
