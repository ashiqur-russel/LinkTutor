import mongoose, { Document } from "mongoose";

export enum BookingStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export enum SessionStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

// Interface for an individual booking session.
export interface IBookingSession extends Document {
  sessionDate: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
  status: SessionStatus;
}

// Main Booking interface.
export interface IBooking extends Document {
  student: mongoose.Types.ObjectId;
  tutor: mongoose.Types.ObjectId;
  packageStartDate: Date;
  packageEndDate: Date;
  packageHours: number;
  sessions: IBookingSession[];
  status: BookingStatus;
  isBookingCancelled: boolean;
  bookingCancelledBy?: mongoose.Types.ObjectId;
  cancellationReason?: string;
  cancellationTime?: Date;
  requestReference?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
