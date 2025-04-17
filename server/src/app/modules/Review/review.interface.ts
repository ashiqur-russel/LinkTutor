import { Types } from "mongoose";

export interface IReview {
  tutorId: Types.ObjectId;
  studentId: Types.ObjectId;
  comment?: string;
  rating?: number;
}
