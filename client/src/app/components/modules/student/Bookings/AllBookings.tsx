import { Button } from "@/components/ui/button";
import { formatTime } from "@/app/lib/formatTime";
import React from "react";
import { formatDate } from "@/app/lib/formatDate";
import { IBooking, PaginationMeta } from "@/app/types";
import {
  subjectColorMap,
  subjectTagBaseClass,
  textInfoClass,
} from "@/app/utils/booking/subjectColorMap";
import LinkTutorPagination from "@/components/core/LinkTutorPagination";

type AllBookingsProps = {
  role: string;
  result: IBooking[];
  meta: PaginationMeta;
};

const AllBookings = ({ role, result, meta }: AllBookingsProps) => {
  const renderSubject = (subject: string) => {
    const colorClass = subjectColorMap[subject] || "bg-gray-500";
    return (
      <span
        className={`${subjectTagBaseClass} ${colorClass} min-w-40 text-center`}
      >
        {subject}
      </span>
    );
  };

  return (
    <div className="w-[80%] mt-10 m-auto">
      <div className="flex justify-between gap-3 mb-3">
        <h1 className="text-lg p-1 font-bold">Bookings</h1>
        <div className="flex justify-end gap-3">
          <Button className="min-w-3/12 md:min-w-2/12">PAST</Button>
          <Button className="min-w-3/12 md:min-w-2/12">UPCOMING</Button>
        </div>
      </div>

      {result?.map((booking: IBooking) => (
        <div key={booking._id} className="mb-2">
          <div className="flex w-full border rounded-lg p-4 shadow-md items-center justify-center flex-col md:flex-row">
            <div className="flex-1 md:mx-2 font-bold space-y-1">
              {renderSubject(booking.subject)}

              {role === "tutor" && (
                <p className={`${textInfoClass} text-gray-600`}>
                  Class: {booking?.student?.classLevel}
                </p>
              )}

              <p className="text-md font-mono text-gray-500">
                Date: {formatDate(new Date(booking.sessionDate))}
              </p>
              <p className="text-md font-mono text-gray-500">
                Time:{" "}
                {booking.sessionStart &&
                  formatTime(new Date(booking.sessionStart))}{" "}
                -{" "}
                {booking.sessionEnd && formatTime(new Date(booking.sessionEnd))}
              </p>

              <p className={textInfoClass}>
                {role === "student"
                  ? `Tutor: ${booking.tutor?.name || "Unknown"}`
                  : `Student: ${booking.student?.name || "Unknown"}`}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <LinkTutorPagination totalPage={meta.totalPage} pageName={"booking"} />
    </div>
  );
};

export default AllBookings;
