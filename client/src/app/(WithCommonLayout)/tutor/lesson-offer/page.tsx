import React from "react";
import AllBookings from "@/app/components/modules/student/Bookings/AllBookings";
import LessonOffer from "@/app/components/modules/tutor/lesson-offer/LessonOffer";
import { getCurrentUser } from "@/app/services/AuthService";
import { fetchMyBookings } from "@/app/services/BookingService";
import { fetchMyFutureLessonRequests } from "@/app/services/LessonRequestService";

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
