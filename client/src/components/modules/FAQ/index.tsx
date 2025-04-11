import Image from "next/image";
import React from "react";
import FAQImage from "../../../../public/faq.jpg"; // Your full-width FAQ image
import FAQ from "./Faq";

const FaqSection = () => {
  return (
    <section className="relative bg-white">
      {/* Banner with fixed height */}
      <div className="relative w-full h-[280px] overflow-hidden">
        <Image
          src={FAQImage}
          alt="FAQ Illustration"
          fill
          className="object-contain w-full h-full"
          priority
        />

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 100"
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

      {/* FAQ Accordion Section */}
      <div className="relative z-10">
        <FAQ />
      </div>
    </section>
  );
};

export default FaqSection;
