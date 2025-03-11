// booking.interface.ts
import { Document, Types } from "mongoose";
import { BookingStatus, CanceledBy, PaymentStatus } from "./booking.constant";
import { UserRole } from "../User/User.interface";

interface ICheckTimeslotAvailability {
  userId: string;
  role: UserRole;
  sessionDate: Date;
  sessionStart: Date;
  sessionEnd: Date;
}

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
  cancelReason?: string | null;
  cancellationTime?: Date;
  bookingStatus?: BookingStatus;
  paymentStatus?: PaymentStatus;
  paymentId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
