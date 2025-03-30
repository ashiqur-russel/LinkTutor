import React from "react";

const LessonRequest = () => {
  return (
    <div className="w-[80%] mt-10  m-auto ">
      <div className="flex border rounded-lg p-4 shadow-md items-center justify-center flex-col md:flex-row max-h-[250px]">
        {/* <div className="flex justify-center mb-4"></div> */}

        <div className=" flex-1 md:mx-2 font-bold ">
          <h3 className="text-lg font-bold"></h3>
          <p className="text-lg text-gray-600">Subjects: Mathmetics</p>
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
