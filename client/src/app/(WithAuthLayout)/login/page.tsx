import React, { Suspense } from "react";
import Login from "@/components/modules/Auth/Login";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className=" bg-[#F7F7F7] w-full">
        <Login />
      </div>
    </Suspense>
  );
};

export default LoginPage;
