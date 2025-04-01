"use client";
import { ILessonRequest } from "@/app/types/lesson";
import { Button } from "@/components/ui/button";
import React from "react";

type AllRequestProps = {
  requests: ILessonRequest[];
  role: string;
};

const AllRequest = ({ requests, role }: AllRequestProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-[80%] mt-10 m-auto">
      <div className="flex justify-between gap-3 mb-3">
        <h1 className="text-lg p-1 font-bold">Lesson Request</h1>
        <div className="flex justify-end gap-3">
          <Button className="min-w-3/12 md:min-w-2/12">PAST</Button>
          <Button className="min-w-3/12 md:min-w-2/12">UPCOMING</Button>
        </div>
      </div>

      {requests?.map((request) => (
        <div key={request._id}>
          {role === "student" && request.type === "offer" && (
            <div className="flex w-full border rounded-lg p-4 shadow-md items-center justify-center flex-col md:flex-row max-h-auto">
              <div className="flex-1 md:mx-2 font-bold">
                <h3 className="text-lg font-mono">{request.subject}</h3>
                <p>LessonId: {request._id}</p>
                <p className="text-lg font-mono text-gray-600">
                  Subjects: {request.subject}
                </p>
                <p className="text-lg font-mono text-gray-500">
                  Date: {new Date(request.sessionDate).toString()}
                </p>
                <p className="text-lg font-mono text-gray-500">
                  Time: {formatTime(new Date(request.sessionStart))} -{" "}
                  {formatTime(new Date(request.sessionEnd))}
                </p>
                {role === "student" ? (
                  <p className="text-lg font-mono text-gray-500">
                    Tutor: {request.tutorId}
                  </p>
                ) : (
                  <p className="text-lg font-mono text-gray-500">
                    Student: {request.studentId}
                  </p>
                )}
              </div>

              <div className="text-center mt-4 w-full md:w-80">
                {role === "student" && request.status === "pending" ? (
                  <>
                    <div className="mt-4 flex flex-col gap-2">
                      <button className="btn-primary text-white">Accept</button>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <button className="btn-decline">Decline</button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllRequest;
