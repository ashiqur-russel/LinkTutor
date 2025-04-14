import React from "react";
import AllBookings from "@/components/modules/student/Bookings/AllBookings";
import LessonRequest from "@/components/modules/student/lesson-request/LessonRequest";
import { getCurrentUser } from "@/services/AuthService";
import { fetchMyBookings } from "@/services/BookingService";
import { fetchMyFutureLessonRequests } from "@/services/LessonRequestService";

const LessonRequestPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageName?: string }>;
}) => {
  const user = await getCurrentUser();

  const { page = "1", pageName } = await searchParams;

  const currentPage = Number(page);

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
