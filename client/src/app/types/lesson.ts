export interface ILessonRequest {
  _id: string;
  tutorId: string;
  studentId: string;
  subject: string;
  type: string;
  duration: string | number;
  sessionDate: Date;
  sessionStart: Date;
  sessionEnd: Date;
  isAccepted?: boolean;
  isDeclined?: boolean;
  status: "pending" | "accepted" | "cancelled" | "declined";
  createdAt?: Date;
  updatedAt?: Date;
}

export enum BookingStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  HELD = "held",
}

export interface IBooking {
  _id: string;
  tutor: { name: string };
  student: { name: string; classLevel: string };
  type: string;
  subject: string;
  sessionDate: Date;
  sessionStart?: Date;
  sessionEnd?: Date;
  isCancelled?: boolean;
  cancelReason?: string | null;
  cancellationTime?: Date;
  bookingStatus?: BookingStatus;
  paymentStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}
