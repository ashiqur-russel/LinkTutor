import AllTutorList from "@/app/components/modules/tutor/AllTutorList";
import { getAllTutors } from "@/app/services/TutorService";
import React from "react";

const TutorPage = async () => {
  const { data, meta } = await getAllTutors();
  console.log(data, meta);
  return (
    <div className="">
      <AllTutorList tutor={data}  />{" "}
    </div>
  );
};

export default TutorPage;
