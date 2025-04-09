import React from "react";
import AvatarCard from "./cards/AvatarCard";
import GeneralInfoCard from "./cards/GeneralInfoCard";
import AddressCard from "./cards/AddressCard";
import AvailabilityCard from "./cards/AvailabilityCard";
import SubjectsCard from "./cards/SubjectsCard";
import { HOURS_OF_DAY } from "@/constants/availibity";

interface TutorData {
  name: string;
  email: string;
  role: string;
  phone: string;
  isActive: boolean;
  availability: {
    day:
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday";
    startTime: (typeof HOURS_OF_DAY)[number];
    endTime: (typeof HOURS_OF_DAY)[number];
  }[];
  subjects: string[];
  hourRate: number;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  imageUrl: string;
}

const mockTutor: TutorData = {
  name: "Mohammad Ashiqur Rahman",
  email: "rahman.tuc@gmail.com",
  role: "tutor",
  phone: "017663768794",
  isActive: true,
  availability: [
    {
      day: "Monday",
      startTime: "09:00",
      endTime: "22:00",
    },
  ],
  subjects: ["Mathematics"],
  hourRate: 15,
  address: {
    street: "Breite Gasse 21",
    city: "Nürnberg",
    state: "Saxony",
    postalCode: "90402",
    country: "Germany",
  },
  imageUrl: "/assets/tutor/tutor.avif",
};

const TutorProfile = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <AvatarCard
              isActive={mockTutor.isActive}
              imageUrl={mockTutor?.imageUrl}
            />
            <GeneralInfoCard
              name={mockTutor.name}
              email={mockTutor.email}
              phone={mockTutor.phone}
              hourRate={mockTutor.hourRate}
            />
          </div>
          <div className="md:col-span-2 space-y-6">
            <AddressCard address={mockTutor.address} />
            <AvailabilityCard initialAvailability={mockTutor.availability} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SubjectsCard subjects={mockTutor.subjects} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
