import React from "react";

import LessonOffer from "@/components/modules/tutor/lesson-offer/LessonOffer";
import AllBookings from "@/components/modules/student/Bookings/AllBookings";
import { getCurrentUser } from "@/services/AuthService";
import { fetchMyBookings } from "@/services/BookingService";
import { fetchMyFutureLessonRequests } from "@/services/LessonRequestService";

const LessonOfferPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; pageName?: string };
}) => {
  const user = await getCurrentUser();

  const { page = "1", pageName } = searchParams;

  const currentPage = Number(page);

  const bookingPage = pageName === "booking" ? currentPage : 1;
  const lessonRequestPage = pageName === "request" ? currentPage : 1;

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
      <LessonOffer requests={lessonRequestData} meta={lessonRequestMeta} />
      <AllBookings
        role={user?.role}
        result={bookingResult}
        meta={bookingMeta}
      />
    </div>
  );
};

export default LessonOfferPage;
