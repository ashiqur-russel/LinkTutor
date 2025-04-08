import AllBookings from "@/app/components/modules/student/Bookings/AllBookings";
import LessonRequest from "@/app/components/modules/student/lesson-request/LessonRequest";
import { getCurrentUser } from "@/app/services/AuthService";
import { fetchMyFutureLessonRequests } from "@/app/services/LessonRequestService";
import React from "react";

const LessonRequestPage = async () => {
  const user = await getCurrentUser();
  const { data: lessonRequest } = await fetchMyFutureLessonRequests(
    user?.userId
  );
  return (
    <div className="flex flex-col items-center w-[80%] m-auto">
      <LessonRequest requests={lessonRequest} />
      <AllBookings role={user?.role} userId={user?.userId} />
    </div>
  );
};

export default LessonRequestPage;
