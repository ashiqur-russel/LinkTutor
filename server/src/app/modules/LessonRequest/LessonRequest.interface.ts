import { Document, Types } from "mongoose";

export interface ILessonRequest extends Document {
  _id: Types.ObjectId;
  tutorId: Types.ObjectId;
  studentId: Types.ObjectId;
  subject: string;
  duration: string | number;
  sessionDate: Date;
  sessionStart: Date;
  sessionEnd: Date;
  isAccepted?: boolean;
  isDeclined?: boolean;
  status: "pending" | "accepted" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
