import { Button } from "@/components/ui/button";
import { formatTime } from "@/app/lib/formatTime";
import React from "react";
import { BookingStatus, IBooking } from "@/app/types";
import { formatDate } from "@/app/lib/formatDate";

type AllBookingsProps = {
  role: string;
  userId: string;
};
const bookngs: IBooking[] = [
  {
    _id: "1",
    type: "booking",
    subject: "Physics",
    sessionDate: new Date("2025-04-10T14:00:00Z"),
    sessionStart: new Date("2025-04-10T14:00:00Z"),
    sessionEnd: new Date("2025-04-10T15:00:00Z"),
    bookingStatus: BookingStatus.ACTIVE,
    tutor: "tutor_123",
    student: "student_456",
    paymentStatus: "paid",
  },
  {
    _id: "2",
    type: "booking",
    subject: "Mathematics",
    sessionDate: new Date("2025-04-12T10:00:00Z"),
    sessionStart: new Date("2025-04-12T10:00:00Z"),
    sessionEnd: new Date("2025-04-12T11:00:00Z"),
    bookingStatus: BookingStatus.ACTIVE,

    tutor: "tutor_789",
    student: "student_456",
    paymentStatus: "paid",
  },
  {
    _id: "3",
    type: "booking",
    subject: "English",
    sessionDate: new Date("2025-04-15T16:00:00Z"),
    sessionStart: new Date("2025-04-15T16:00:00Z"),
    sessionEnd: new Date("2025-04-15T17:00:00Z"),
    bookingStatus: BookingStatus.ACTIVE,
    tutor: "tutor_234",
    student: "student_123",
    paymentStatus: "paid",
  },
];
const AllBookings = ({ role, userId }: AllBookingsProps) => {
  console.log("All bookings for", userId, role);

  return (
    <div className="w-[80%] mt-10 m-auto">
      <div className="flex justify-between gap-3 mb-3">
        <h1 className="text-lg p-1 font-bold">Bookings</h1>
        <div className="flex justify-end gap-3">
          <Button className="min-w-3/12 md:min-w-2/12">PAST</Button>
          <Button className="min-w-3/12 md:min-w-2/12">UPCOMING</Button>
        </div>
      </div>

      {bookngs?.map((booking) => (
        <div key={booking._id}>
          {role === "student" && booking.type === "booking" && (
            <div className="flex w-full border rounded-lg p-4 shadow-md items-center justify-center flex-col md:flex-row max-h-auto">
              <div className="flex-1 md:mx-2 font-bold">
                <h3 className="text-lg font-mono">{booking.subject}</h3>
                <p>LessonId: {booking._id}</p>
                <p className="text-lg font-mono text-gray-600">
                  Subjects: {booking.subject}
                </p>
                <p className="text-lg font-mono text-gray-500">
                  Date: {formatDate(new Date(booking.sessionDate))}
                </p>
                <p className="text-lg font-mono text-gray-500">
                  Time:{" "}
                  {booking.sessionStart &&
                    formatTime(new Date(booking.sessionStart))}{" "}
                  -{" "}
                  {booking.sessionEnd &&
                    formatTime(new Date(booking.sessionEnd))}
                </p>
                {role === "student" ? (
                  <p className="text-lg font-mono text-gray-500">
                    Tutor: {booking.tutor}
                  </p>
                ) : (
                  <p className="text-lg font-mono text-gray-500">
                    Student: {booking.student}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllBookings;
