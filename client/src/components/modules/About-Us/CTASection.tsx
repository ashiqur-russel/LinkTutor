"use client";
import React from "react";
import Image from "next/image";
import CtaImage from "../../../../public/cta-kid.png";

const CTASection = () => {
  return (
    <section className="10 pt-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#12384b] mb-6">
            Unleash your child's potential
          </h2>
          <button className="mt-6 btn-primary text-white px-6 py-3 rounded-md text-lg shadow-md">
            Get started now
          </button>
        </div>
        <div className="flex justify-center">
          <Image
            src={CtaImage}
            alt="Child Learning Illustration"
            className="w-full max-w-md"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
