"use client";
import React from "react";
import Image from "next/image";
import FutureBanner from "../../../../public/digital_learning.png";

const DigitalLearning = () => {
  return (
    <section className="bg-[#0e4b66] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Image or Video Placeholder */}
        <div className="flex justify-center">
          <div className="bg-white rounded-xl p-2 shadow-2xl">
            <Image
              src={FutureBanner}
              alt="Video preview"
              className="rounded-lg w-full max-w-md"
            />
          </div>
        </div>

        <div>
          <p className="uppercase tracking-wider text-sm text-slate-200 mb-2">
            We create future <span className="font-semibold">learning</span>
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#94d7eb] mb-4 leading-snug">
            We want to make <br /> learning more digital
          </h2>
          <p className="text-slate-300 text-lg">
            We believe the future of education is hybrid. By combining smart
            digital tools with great teachers, we help students learn better,
            faster, and more interactively.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DigitalLearning;
