import { Document, Types } from "mongoose";

export interface ILessonRequest extends Document {
  tutorId: Types.ObjectId;
  studentId: Types.ObjectId;
  subject: string;
  duration: string | number;
  sessionDate: Date;
  sessionStart: Date;
  sessionEnd: Date;
  isAccepted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
