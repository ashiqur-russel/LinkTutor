import mongoose, { Document, Schema, Model } from "mongoose";

/* ============================================================
   Request Schema, Interface, & Model
   ============================================================ */
export interface ILessonRequest extends Document {
  student: mongoose.Types.ObjectId;
  tutor: mongoose.Types.ObjectId;
  subject: string;
  startTime: Date;
  endTime: Date;
  requestAccepted: boolean;
  createdAt: Date;
}
