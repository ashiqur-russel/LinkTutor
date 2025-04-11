"use client";
import Image from "next/image";
import React from "react";
import LearningBanner from "../../../../public/learn_banner.svg";

const AboutVision = () => {
  return (
    <section className="relative bg-white">
      {/* Banner Section with Curve */}
      <div className="relative w-full h-[280px] overflow-hidden">
        <Image
          src={LearningBanner} // <-- update with your image path
          alt="Banner"
          fill
          className="object-cover"
        />

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0  1440 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[80px]"
          >
            <path
              fill="#ffffff"
              d="M0,0 C360,80 1080,80 1440,0 L1440,100 L0,100 Z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-4">
          Our vision
        </h2>
        <div className="w-20 h-1 mx-auto bg-teal-400 rounded-full mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700 text-lg leading-relaxed">
          <div>
            <p>
              With LinkTutor, we create a tutoring space where each student's
              individual potential is revealed and nurtured.
            </p>
            <p className="mt-4">
              Because every student thinks and understands things differently.
              And that’s a good thing! These different ways of thinking lead to
              new ideas, alternative approaches, and questions that are
              important for shaping our future.
            </p>
          </div>
          <div>
            <p>
              In today's school system, one teacher teaches up to 30 students,
              which means individual needs and personal thought patterns cannot
              be adequately supported.
            </p>
            <p className="mt-4">
              We want to support students in clarifying their individual
              questions and problems and thus reducing deficits so that each
              student can develop their unique potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
