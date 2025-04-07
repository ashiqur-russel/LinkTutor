import mongoose, { Schema, Model } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema: Schema<IPayment> = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    default: null,
  },
  lessonRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LessonRequest",
    default: null,
  },
  amount: { type: Number, required: true },
  currency: { type: String, default: "EUR" },
  status: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },
  paymentIntentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

PaymentSchema.index({ lessonRequestId: 1 }, { unique: true });

export const Payment: Model<IPayment> = mongoose.model<IPayment>(
  "Payment",
  PaymentSchema
);
