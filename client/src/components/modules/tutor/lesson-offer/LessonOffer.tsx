"use client";
import { formatDate } from "@/lib/formatDate";
import {
  acceptLessonRequest,
  declineLessonRequest,
} from "@/services/LessonRequestService";
import { PaginationMeta } from "@/types";
import { ILessonRequest } from "@/types/lesson";
import LinkTutorPagination from "@/components/core/LinkTutorPagination";
import React, { useState, useTransition } from "react";

type LessonOfferProps = {
  requests: ILessonRequest[];
  meta: PaginationMeta;
};

const LessonOffer = ({ requests, meta }: LessonOfferProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeclineRequest = async (requestId: string) => {
    if (
      !window.confirm("Are you sure you want to decline this lesson request?")
    ) {
      return;
    }

    setLoading(requestId);
    startTransition(async () => {
      try {
        await declineLessonRequest(requestId);
      } catch (error) {
        console.error("Failed to cancel lesson request:", error);
      } finally {
        setLoading(null);
      }
    });
  };

  const handleAcceptRequest = async (requestId: string) => {
    if (!window.confirm("Do you want to accept this lesson request?")) {
      return;
    }

    setLoading(requestId);
    startTransition(async () => {
      try {
        await acceptLessonRequest(requestId);
      } catch (error) {
        console.error("Failed to accept lesson request:", error);
      } finally {
        setLoading(null);
      }
    });
  };

  return (
    <div className="w-[80%] mt-10 m-auto ">
      {requests?.map((request) => (
        <div
          key={request._id}
          className="flex border w-fit md:w-full
  rounded-lg p-4 shadow-md items-center justify-center flex-col md:flex-row max-h-auto"
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
              Student: {request.studentId.name}
            </p>
          </div>

          <div className="text-center flex flex-col gap-2 mt-4 w-full md:w-60">
            {request.status !== "accepted" &&
              request.status !== "cancelled" && (
                <button
                  onClick={() => handleDeclineRequest(request._id)}
                  className={`btn-decline ${
                    request.status === "declined"
                      ? "bg-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    loading === request._id ||
                    isPending ||
                    request.status === "declined"
                  }
                >
                  {loading === request._id
                    ? "..."
                    : request.status === "declined"
                    ? "Declined"
                    : "Decline"}
                </button>
              )}
            {request.status !== "declined" &&
              request.status !== "cancelled" && (
                <button
                  onClick={() => handleAcceptRequest(request._id)}
                  className={`btn-primary ${
                    request.status === "accepted"
                      ? "bg-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    loading === request._id ||
                    isPending ||
                    request.status === "accepted"
                  }
                >
                  {loading === request._id
                    ? "..."
                    : request.status === "accepted"
                    ? "Accepeted"
                    : "Accept"}
                </button>
              )}

            {request.status === "cancelled" && (
              <button className="btn-primary bg-gray-500 cursor-pointer-none">
                Cancelled
              </button>
            )}
          </div>
        </div>
      ))}
      <LinkTutorPagination
        totalPage={meta.totalPage}
        basePath={`/student/lesson-request`}
        pageName={"request"}
      />
    </div>
  );
};

export default LessonOffer;
