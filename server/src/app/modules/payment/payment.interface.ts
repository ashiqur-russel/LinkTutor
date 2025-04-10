import { Document, Types } from "mongoose";

export interface IPayment extends Document {
  lessonRequestId?: Types.ObjectId;
  bookingId?: Types.ObjectId;
  studentId?: Types.ObjectId;
  tutorId?: Types.ObjectId;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "failed" | "refunded";
  paymentIntentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
