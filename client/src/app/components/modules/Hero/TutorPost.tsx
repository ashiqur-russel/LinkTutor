import Image from "next/image";
import tutorPostAdImg from "../../../../../public/teacher-post-ad.svg";

import { Button } from "@/components/ui/button";

import { GraduationCap, ArrowRight } from "lucide-react";

export default function TutorCTA() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl md:text-4xl font-bold leading-snug mb-8">
          Are you a tutor? <span className="text-blue-600">Join us</span> and
          start tutoring
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Become a tutor
                <ArrowRight className="h-4 w-4 text-yellow-500" />
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Join more than 200,000 private tutors advertised on LinkTutors.
              </p>

              <Button variant="default" className="mt-4">
                Create Your Ad
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end">
            <Image
              src={tutorPostAdImg}
              alt="Tutor illustration"
              width={350}
              height={300}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
