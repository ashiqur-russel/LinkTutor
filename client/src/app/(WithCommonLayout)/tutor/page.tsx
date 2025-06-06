import AllTutorList from "@/components/modules/tutor/AllTutorList";
import { getCurrentUser } from "@/services/AuthService";
import React from "react";

const TutorPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="">
      <AllTutorList userId={user?.userId} />{" "}
    </div>
  );
};

export default TutorPage;
