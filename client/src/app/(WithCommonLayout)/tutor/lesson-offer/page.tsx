import AllBookings from "@/app/components/modules/student/Bookings/AllBookings";
import LessonOffer from "@/app/components/modules/tutor/lesson-offer/LessonOffer";
import { getCurrentUser } from "@/app/services/AuthService";
import { fetchMyFutureLessonRequests } from "@/app/services/LessonRequestService";

const LessonOfferPage = async () => {
  const user = await getCurrentUser();
  const { data: lessonRequest } = await fetchMyFutureLessonRequests(
    user?.userId
  );
  return (
    <div className="flex flex-col items-center w-[80%] m-auto">
      <LessonOffer requests={lessonRequest} />
      <AllBookings role={user?.role} userId={user?.userId} />
    </div>
  );
};

export default LessonOfferPage;
