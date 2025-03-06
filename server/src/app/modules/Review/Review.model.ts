import mongoose, { Model, Schema } from "mongoose";
import { IReview } from "./Review.interface";

const ReviewSchema: Schema<IReview> = new Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  review: { type: String, required: true },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Review: Model<IReview> = mongoose.model<IReview>(
  "Review",
  ReviewSchema
);
