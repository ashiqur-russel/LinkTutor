import HeroSection from "@/app/components/modules/Hero";
import HowItWorks from "@/app/components/modules/Hero/HowItWorks";
import LessonsPage from "@/app/components/modules/Hero/LessonSection";
import TutorsLists from "@/app/components/modules/Hero/TutorList";
import TutorCTA from "@/app/components/modules/Hero/TutorPost";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <TutorsLists />
      <LessonsPage />
      <TutorCTA />
    </div>
  );
};

export default Home;
