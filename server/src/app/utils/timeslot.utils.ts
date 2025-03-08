import { Types } from "mongoose";
import { Booking } from "../modules/booking/booking.model";
import { UserRole } from "../modules/User/User.interface";

interface ICheckTimeslotAvailability {
  userId: Types.ObjectId;
  role: UserRole;
  sessionDate: Date;
  sessionStart: Date;
  sessionEnd: Date;
}

/**
 * Checks if there's a conflicting Booking in the DB for the given user & timeslot.
 * Returns `true` if available, `false` if there's a conflict.
 */
export async function checkTimeslotAvailability({
  userId,
  role,
  sessionDate,
  sessionStart,
  sessionEnd,
}: ICheckTimeslotAvailability): Promise<boolean> {
  // Base query: same sessionDate, overlapping times
  const query: any = {
    sessionDate,
    $or: [
      {
        sessionStart: { $lt: sessionEnd },
        sessionEnd: { $gt: sessionStart },
      },
    ],
  };

  // Match user role to the correct field in Booking
  if (role === UserRole.TUTOR) {
    query.tutorId = userId;
  } else if (role === UserRole.STUDENT) {
    query.studentId = userId;
  }

  // Count any existing bookings that overlap
  const conflictCount = await Booking.countDocuments(query);

  // If conflictCount > 0, there's a clash
  return conflictCount === 0;
}
