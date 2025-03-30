import { Button } from "@/components/ui/button";
import React from "react";

const AllRequest = () => {
  return (
    <div className="w-[80%] mt-10  m-auto">
      <div className="flex justify-between gap-3 mb-3">
        <h1 className="text-lg p-1 font-bold">Lesson Offer</h1>
        <div className="flex justify-end gap-3">
          {" "}
          <Button className="min-w-3/12 md:min-w-2/12">PAST</Button>
          <Button className="min-w-3/12 md:min-w-2/12">UPCOMING</Button>
        </div>
      </div>

      <div className="flex w-full border rounded-lg p-4 shadow-md items-center justify-center flex-col md:flex-row max-h-[250px]">
        <div className="flex-1 md:mx-2 font-bold ">
          <h3 className="text-lg font-mono"></h3>
          <p className="text-lg font-mono text-gray-600">Subjects: Math</p>
          <p className="text-lg font-mono text-gray-500">
            Date: 10 April, 2025
          </p>
          <p className="text-lg font-mono text-gray-500">Time: 15:00 - 16:00</p>
          <p className="text-lg font-mono  text-gray-500">Tutor: John</p>
        </div>

        <div className="text-center mt-4 w-full md:w-80">
          <div className="mt-4 flex flex-col gap-2">
            <button className="btn-primary text-white">Accept</button>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <button className="btn-decline  ">Decline</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRequest;
