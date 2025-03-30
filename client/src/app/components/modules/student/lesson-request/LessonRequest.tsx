import React from "react";

interface ISession {
  _id: string;
  tutorId: string;
  studentId: string;
  status: string;
  subject: string;
  duration: number;
  sessionDate: string;
  sessionStart: string;
  sessionEnd: string;
  isAccepted: boolean;
  isDeclined: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockSession: ISession = {
  _id: "67cbbaecb2bf86085d815528",
  tutorId: "67cb2e558307779921dea362",
  studentId: "67cb2e5e8307779921dea369",
  status: "pending",
  subject: "Mathematics",
  duration: 2,
  sessionDate: "2025-03-08T00:00:00.000Z",
  sessionStart: "2025-03-08T10:00:00.000Z",
  sessionEnd: "2025-03-08T11:00:00.000Z",
  isAccepted: false,
  isDeclined: false,
  createdAt: "2025-03-08T03:35:08.188Z",
  updatedAt: "2025-03-08T03:35:08.188Z",
};

const LessonRequest = () => {
  return (
    <div className="w-[80%] mt-10  m-auto ">
      <div className="flex border rounded-lg p-4 shadow-md items-center justify-center flex-col md:flex-row max-h-[250px]">
        {/* <div className="flex justify-center mb-4"></div> */}

        <div className=" flex-1 md:mx-2 font-bold ">
          <h3 className="text-lg font-bold"></h3>
          <p className="text-lg text-gray-600">
            Subjects: {mockSession.subject}
          </p>
          <p className="text-lg font-mono text-gray-500">
            Date: 10 April, 2025
          </p>
          <p className="text-lg font-mono text-gray-500">Time: 15:00 - 16:00</p>
          <p className="text-lg font-mono text-gray-500">Tutor: John</p>
        </div>

        <div className="text-center mt-4 w-full md:w-80">
          <div className="mt-4 flex flex-col gap-2">
            <button className="btn-decline">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonRequest;
