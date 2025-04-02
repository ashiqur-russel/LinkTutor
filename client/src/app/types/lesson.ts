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
