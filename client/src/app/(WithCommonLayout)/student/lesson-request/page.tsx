import React from "react";
import AllBookings from "@/app/components/modules/student/Bookings/AllBookings";
import LessonRequest from "@/app/components/modules/student/lesson-request/LessonRequest";
import { getCurrentUser } from "@/app/services/AuthService";
import { fetchMyBookings } from "@/app/services/BookingService";
import { fetchMyFutureLessonRequests } from "@/app/services/LessonRequestService";

const LessonRequestPage = async ({
  searchParams,
}: {
  searchParams?: { page?: string; pageName?: string };
}) => {
  const user = await getCurrentUser();

  const currentPage = Number(searchParams?.page || 1);
  const pageName = searchParams?.pageName;

  // Decide page numbers for each section
  const bookingPage = pageName === "booking" ? currentPage : 1;
  const lessonRequestPage = pageName === "lesson-request" ? currentPage : 1;

  const [
    {
      data: { result: bookingResult, meta: bookingMeta },
    },
    { data: lessonRequestData, meta: lessonRequestMeta },
  ] = await Promise.all([
    fetchMyBookings(user?.userId, bookingPage.toString()),
    fetchMyFutureLessonRequests(user?.userId, lessonRequestPage.toString()),
  ]);

  return (
    <div className="flex flex-col items-center w-[80%] m-auto">
      <LessonRequest requests={lessonRequestData} meta={lessonRequestMeta} />
      <AllBookings
        role={user?.role}
        result={bookingResult}
        meta={bookingMeta}
      />
    </div>
  );
};

export default LessonRequestPage;
