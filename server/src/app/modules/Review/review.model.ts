import { Schema, model } from "mongoose";
import { IReview } from "./review.interface";

const ReviewSchema = new Schema<IReview>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tutorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookingId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: false },
    comment: { type: String, required: false },
  },
  { timestamps: true }
);

const Review = model("Review", ReviewSchema);

export default Review;
