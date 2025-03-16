"use client";

import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <div className="p-8 rounded-lg w-full max-w-sm">
        <h1 className="text-center text-2xl  font-bold ">LinkTutor</h1>
        <h2 className="text-xl font-bold text-[#1E425C] text-center mb-6">
          Welcome Back!
        </h2>

        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="text-center text-sm font-semibold text-yellow-600">
            <Link href="/forgot-password" className="hover:underline">
              Forget Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#C4A046] hover:bg-[#B3953D] text-white font-bold py-3 rounded-md transition"
          >
            Login now
          </button>

          <div className="text-center text-sm font-semibold text-yellow-600">
            Don&apos;t have an account yet?{" "}
            <Link href="/register/student" className="hover:underline">
              <span className="text-yellow-500" style={{ fontSize: "" }}>
                Register now
              </span>{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
