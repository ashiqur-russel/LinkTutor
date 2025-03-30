import { ILessonRequest } from "@/app/types/lesson";
import React from "react";

type LessonRequestProps = {
  requests: ILessonRequest[];
};

const LessonOffer = ({ requests }: LessonRequestProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="w-[80%] mt-10  m-auto ">
      {requests.map((request) => (
        <div
          key={request._id}
          className="flex border rounded-lg p-4 shadow-md items-center justify-center flex-col md:flex-row max-h-auto"
        >
          {/* <div className="flex justify-center mb-4"></div> */}

          <div className=" flex-1 md:mx-2 font-bold ">
            <h3 className="text-lg font-bold"></h3>
            <p className="text-lg text-gray-600">Subject: {request.subject}</p>
            <p className="text-lg font-mono text-gray-500">
              Date: {formatDate(new Date(request.sessionDate))}
            </p>
            <p className="text-lg font-mono text-gray-500">
              Time: {formatTime(new Date(request.sessionStart))} -{" "}
              {formatTime(new Date(request.sessionEnd))}
            </p>
            <p className="text-lg font-mono text-gray-500">
              Tutor: {request.tutorId}
            </p>
          </div>

          <div className="text-center mt-4 w-full md:w-80">
            <div className="mt-4 flex flex-col gap-2">
              <button className="btn-decline">Cancel</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonOffer;
