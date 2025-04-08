import AllBookings from "@/app/components/modules/student/Bookings/AllBookings";
import LessonOffer from "@/app/components/modules/tutor/lesson-offer/LessonOffer";
import { getCurrentUser } from "@/app/services/AuthService";
import { fetchMyBookings } from "@/app/services/BookingService";
import { fetchMyFutureLessonRequests } from "@/app/services/LessonRequestService";

const LessonOfferPage = async () => {
  const user = await getCurrentUser();
  const { data: lessonRequest } = await fetchMyFutureLessonRequests(
    user?.userId
  );

  const {
    data: { result, meta },
  } = await fetchMyBookings(user?.userId);
  return (
    <div className="flex flex-col items-center w-[80%] m-auto">
      <LessonOffer requests={lessonRequest} />
      <AllBookings role={user?.role} result={result} meta={meta} />
    </div>
  );
};

export default LessonOfferPage;
