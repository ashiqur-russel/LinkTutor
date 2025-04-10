"use client";

import Image from "next/image";
import React, { useState } from "react";
import PhotoTutor from "../../../../public/assets/tutor/tutor.avif";
import { ITutor } from "@/types";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import BookingModal from "../modal/BookingModal";

type TutorProps = {
  tutor: ITutor;
  studentId: string;
};

const TutorInfoCard = ({ tutor, studentId }: TutorProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="flex border rounded-lg p-4 shadow-md items-center justify-center flex-col md:flex-row  max-h-[250px]">
      <div className="flex justify-center mb-4">
        <Image
          src={PhotoTutor}
          alt={tutor.name}
          width={200}
          height={200}
          className="rounded-md object-cover"
        />
      </div>

      <div className="text-center flex-1/2 md:mx-2 text-sm md:text-sm">
        <h3 className="text-lg font-bold">{tutor.name}</h3>
        <p className="text-sm text-gray-600">
          Subjects: {tutor.subjects?.join(", ")}
        </p>
        <p className="text-sm text-gray-500">Availability:</p>
        <p className="text-xs text-gray-500">
          {tutor?.availability?.map((slot, index) => (
            <span
              key={index}
            >{`${slot.day}: ${slot.startTime} - ${slot.endTime}`}</span>
          ))}
        </p>
      </div>

      <div className="text-center mt-4 flex-1/5">
        <div className="flex items-center justify-center mb-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="ml-1 text-sm font-medium">5</span>
        </div>
        <p className="text-lg font-bold">{tutor.hourRate}€</p>
        <div className="mt-4 flex flex-col gap-2">
          <Button
            className="bg-pink-500 hover:bg-pink-600 text-white"
            onClick={() => setIsBookingOpen(true)}
          >
            Book a session
          </Button>
          <Button variant="outline" className="border-gray-300">
            Send Message
          </Button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        tutor={tutor}
        studentId={studentId}
      />
    </div>
  );
};

export default TutorInfoCard;
