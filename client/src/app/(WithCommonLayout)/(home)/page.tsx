import HeroSection from "@/components/modules/Hero";
import TutorLinkFeatures from "@/components/modules/Hero/FeatureSction";
import HowItWorks from "@/components/modules/Hero/HowItWorks";
import LessonsPage from "@/components/modules/Hero/LessonSection";
import Testimonials from "@/components/modules/Hero/Testimonials";
import TutorsLists from "@/components/modules/Hero/TutorList";
import TutorCTA from "@/components/modules/Hero/TutorPost";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <TutorsLists />
      <TutorLinkFeatures />
      <LessonsPage />
      <div className="bg-gradient-to-br from-sky-50 to-white ">
        {" "}
        <Testimonials />
      </div>

      <TutorCTA />
    </div>
  );
};

export default Home;
