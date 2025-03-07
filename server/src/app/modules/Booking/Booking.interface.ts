// booking.interface.ts
import { Document, Types } from "mongoose";
import { BookingStatus, CanceledBy } from "./booking.constant";

export interface IBooking extends Document {
  tutorId: Types.ObjectId;
  studentId: Types.ObjectId;
  lessonOfferId?: Types.ObjectId;
  lessonRequestId?: Types.ObjectId;
  subject: string;
  sessionDate: Date;
  sessionStart?: Date;
  sessionEnd?: Date;
  isCancelled?: boolean;
  canceledBy?: CanceledBy;
  cancelReason?: string;
  bookingStatus?: BookingStatus;
  paymentId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
