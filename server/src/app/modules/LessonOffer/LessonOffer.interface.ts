// lessonOffer.interface.ts
import { Document, Types } from "mongoose";

export interface ILessonOffer extends Document {
  tutorId: Types.ObjectId;
  studentId: Types.ObjectId;
  subject: string;
  type: string;
  duration: string | number;
  sessionDate: Date;
  sessionStart: Date;
  sessionEnd: Date;
  isAccepted?: boolean;
  isDeclined?: boolean;
  status: "pending" | "accepted" | "declined";
  createdAt?: Date;
  updatedAt?: Date;
}
