import { Types } from "mongoose";

export interface IReview {
  tutorId: Types.ObjectId;
  studentId: Types.ObjectId;
  bookingId: Types.ObjectId;
  comment?: string;
  rating?: number;
}
