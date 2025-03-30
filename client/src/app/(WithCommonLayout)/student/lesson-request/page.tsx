import AllRequest from "@/app/components/modules/student/lesson-request/AllRequest";
import LessonRequest from "@/app/components/modules/student/lesson-request/LessonRequest";
import React from "react";

const LessonRequestPage = () => {
  return (
    <div className="flex flex-col items-center w-[80%] m-auto">
      <LessonRequest />
      <AllRequest />
    </div>
  );
};

export default LessonRequestPage;
