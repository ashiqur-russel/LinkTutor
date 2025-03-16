"use client";

import Link from "next/link";
import React from "react";

const RegisterStudent = () => {
  return (
    <div className="bg-white p-8 w-full max-w-lg mt-5">
      <h2 className="text-3xl font-bold text-center text-[#1E425C] mb-6">
        Register with LinkTutor
      </h2>

      <form className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Student’s name*
          </label>
          <input
            type="text"
            placeholder="Student's first name*"
            value="3"
            className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            E-mail*
          </label>
          <input
            type="email"
            placeholder="Your email*"
            value="2"
            className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="block items-center space-x-3">
          <label className="block text-gray-700 font-medium mb-1">
            Mobile number*
          </label>
          <input
            type="text"
            placeholder="Mobile number*"
            value="3"
            className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password*
          </label>
          <input
            type="password"
            placeholder="Your password with at least eight characters*"
            value="2"
            className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-sm text-gray-600 text-center">
          By registering, I confirm that I have read and agree to the{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>{" "}
          of Link Tutor.
        </p>

        <button
          type="submit"
          className="w-full bg-[#C4A046] hover:bg-[#B3953D] text-white font-bold py-3 rounded-md transition"
        >
          Register now
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-yellow-500 font-bold hover:underline"
          >
            Sign in now
          </Link>
        </p>
        <p className="text-center text-gray-600">
          Are you a tutor?{" "}
          <Link
            href="/register/tutor"
            className="text-yellow-500 font-bold hover:underline"
          >
            Click here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterStudent;
