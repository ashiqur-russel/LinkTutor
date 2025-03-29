"use client";

import { ITutor } from "@/app/types";
import Image from "next/image";
import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhotoTutor from "../../../../../public/assets/tutor/tutor.avif";

type AllTutorListProps = {
  tutor: ITutor[];
};

const AllTutorList: React.FC<AllTutorListProps> = ({ tutor }) => {
  return (
    // <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="flex">
      <div className="basis-64 px-6 py-8 bg-amber-100"> sidebar search</div>
      <div className="container flex-1 mx-auto px-6 py-8 grid grid-cols-1 gap-6 basis-128 bg-red-200">
        {tutor?.map((tutor) => (
          <div
            key={tutor.email}
            className="flex border rounded-lg p-4 shadow-md bg-white flex-col md:flex-row"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={PhotoTutor}
                alt={tutor.name}
                width={200}
                height={100}
                className="rounded-md object-cover"
              />
            </div>

            <div className="text-center flex-1/2">
              <h3 className="text-lg font-bold">{tutor.name}</h3>
              <p className="text-sm text-gray-600">
                Subjects: {tutor?.subjects?.join(", ")}
              </p>
              <p className="text-sm text-gray-500">Availability:</p>
              <p className="text-xs text-gray-500">
                {tutor?.availability?.map((slot, index) => (
                  <span
                    key={index}
                  >{`${slot.day}:${slot.startTime} -${slot.endTime}   `}</span>
                ))}
              </p>
            </div>

            <div className="text-center mt-4  flex-1/5">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="ml-1 text-sm font-medium">5</span>
              </div>
              <p className="text-lg font-bold">{tutor.hourRate}€</p>
              <div className="mt-4 flex flex-col gap-2">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                  Book a session
                </Button>
                <Button variant="outline" className="border-gray-300">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTutorList;
