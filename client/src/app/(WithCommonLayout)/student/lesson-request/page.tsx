import AllRequest from "@/app/components/modules/student/lesson-request/AllRequest";
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
      <AllRequest requests={lessonRequest} role={user?.role} />
    </div>
  );
};

export default LessonRequestPage;
