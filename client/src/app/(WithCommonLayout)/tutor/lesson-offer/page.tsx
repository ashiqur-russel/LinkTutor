import AllRequest from "@/app/components/modules/student/lesson-request/AllRequest";
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
      <AllRequest requests={lessonRequest} role={user?.role} />
    </div>
  );
};

export default LessonOfferPage;
