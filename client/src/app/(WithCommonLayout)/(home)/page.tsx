import HeroSection from "@/components/modules/Hero";
import HowItWorks from "@/components/modules/Hero/HowItWorks";
import LessonsPage from "@/components/modules/Hero/LessonSection";
import TutorsLists from "@/components/modules/Hero/TutorList";
import TutorCTA from "@/components/modules/Hero/TutorPost";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <TutorsLists />
      <LessonsPage />
      <TutorCTA />
    </>
  );
};

export default Home;
