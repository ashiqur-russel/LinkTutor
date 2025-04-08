"use client";

import { cancelLessonRequest } from "@/app/services/LessonRequestService";
import { ILessonRequest } from "@/app/types/lesson";
import { formatTime } from "@/app/lib/formatTime";
import { formatDate } from "@/app/lib/formatDate";

import { useState, useTransition } from "react";

type LessonRequestProps = {
  requests: ILessonRequest[];
};

const LessonRequest = ({ requests }: LessonRequestProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCancelRequest = async (requestId: string) => {
    if (
      !window.confirm("Are you sure you want to cancel this lesson request?")
    ) {
      return;
    }

    setLoading(requestId);
    startTransition(async () => {
      try {
        await cancelLessonRequest(requestId);
      } catch (error) {
        console.error("Failed to cancel lesson request:", error);
      } finally {
        setLoading(null);
      }
    });
  };

  return (
    <div className="w-[100%] md:w-full lg:w-[80%] mt-10 m-auto ">
      {requests?.map((request) => (
        <div
          key={request._id}
          className="flex border mb-2 rounded-lg  w-fit  md:w-full p-4 shadow-md items-center justify-center flex-col md:flex-row max-h-auto"
        >
          <div className="flex-1 md:mx-2 font-bold">
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

          <div className=" flex flex-col mt-4 w-full md:w-60 ">
            {request.status !== "declined" && request.status !== "accepted" && (
              <button
                onClick={() => handleCancelRequest(request._id)}
                className={`btn-decline ${
                  request.status === "cancelled"
                    ? "bg-gray-500 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  loading === request._id ||
                  isPending ||
                  request.status === "cancelled"
                }
              >
                {loading === request._id
                  ? "Canceling..."
                  : request.status === "cancelled"
                  ? "Cancelled"
                  : "Cancel"}
              </button>
            )}

            {request.status === "declined" && (
              <button
                className="btn-primary bg-gray-500 cursor-not-allowed"
                disabled
              >
                Declined
              </button>
            )}

            {request.status === "accepted" && (
              <button className="btn-primary  cursor-not-allowed" disabled>
                Accepted
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonRequest;
