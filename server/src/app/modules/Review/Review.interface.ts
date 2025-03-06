import mongoose, { Document } from "mongoose";

/* ============================================================
   Review Schema, Interface, & Model
   ============================================================ */
export interface IReview extends Document {
  tutor: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  review: string;
  rating: number;
  createdAt: Date;
}
