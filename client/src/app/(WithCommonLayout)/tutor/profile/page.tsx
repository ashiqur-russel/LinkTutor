"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Example tutor data (In a real app, fetch from your API or DB)
const tutorData = {
  name: "John Tutor",
  email: "john.tutor@example.com",
  phone: "555-555-5555",
  role: "tutor",
  address: {
    street: "123 Tutor Lane",
    city: "Knowledge City",
    state: "NY",
    postalCode: "10001",
    country: "USA",
  },
  availability: [
    { day: "Monday", startTime: "09:00", endTime: "11:00" },
    { day: "Wednesday", startTime: "14:00", endTime: "16:00" },
  ],
  subjects: ["Mathematics", "Physics"],
  hourRate: 45,
  createdAt: "2025-03-07T17:35:17.718Z",
  updatedAt: "2025-03-07T17:35:17.718Z",
};

export default function TutorProfilePage() {
  return (
    <section className="container mx-auto px-4 py-10">
      {/* Profile Header Card (Photo + Name) */}
      <ProfilePhotoCard user={tutorData} />

      {/* Personal Info Card */}
      <PersonalInfoCard user={tutorData} />

      {/* Address Card */}
      <AddressCard address={tutorData.address} />

      {/* Availability Card */}
      <AvailabilityCard availability={tutorData.availability} />

      {/* Subjects & Hourly Rate Card */}
      <SubjectsCard
        subjects={tutorData.subjects}
        hourRate={tutorData.hourRate}
      />
    </section>
  );
}

// -----------------------------------
// Helper Components
// -----------------------------------

// Profile Photo + Name Card
function ProfilePhotoCard({ user }: { user: any }) {
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
      // In a real app, you would upload the file to the server
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Profile Photo</CardTitle>
        <CardDescription>
          Upload or change your profile picture.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100">
          <Image
            src={
              photo ? URL.createObjectURL(photo) : "/default-avatar.png" // fallback or user’s existing photo
            }
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {user.name}
          </label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        </div>
      </CardContent>
    </Card>
  );
}

// Personal Info Card
function PersonalInfoCard({ user }: { user: any }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Basic details about your profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <span className="font-semibold">Name: </span>
          {user.name}
        </p>
        <p>
          <span className="font-semibold">Email: </span>
          {user.email}
        </p>
        <p>
          <span className="font-semibold">Phone: </span>
          {user.phone || "N/A"}
        </p>
      </CardContent>
    </Card>
  );
}

// Address Card
function AddressCard({ address }: { address: any }) {
  if (!address) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription>Your current address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <span className="font-semibold">Street: </span>
          {address.street}
        </p>
        <p>
          <span className="font-semibold">City: </span>
          {address.city}
        </p>
        <p>
          <span className="font-semibold">State: </span>
          {address.state}
        </p>
        <p>
          <span className="font-semibold">Postal Code: </span>
          {address.postalCode}
        </p>
        <p>
          <span className="font-semibold">Country: </span>
          {address.country}
        </p>
      </CardContent>
    </Card>
  );
}

// Availability Card
function AvailabilityCard({ availability }: { availability: any[] }) {
  if (!availability || availability.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>When are you available to tutor?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {availability.map((slot, index) => (
          <p key={index}>
            <span className="font-semibold">{slot.day}:</span> {slot.startTime}{" "}
            - {slot.endTime}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

// Subjects & Hourly Rate Card
function SubjectsCard({
  subjects,
  hourRate,
}: {
  subjects: string[];
  hourRate: number;
}) {
  if (!subjects || subjects.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Subjects & Hourly Rate</CardTitle>
        <CardDescription>Subjects you teach and your rate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <span className="font-semibold">Subjects: </span>
          {subjects.join(", ")}
        </p>
        <p>
          <span className="font-semibold">Hourly Rate: </span>${hourRate} / hour
        </p>
      </CardContent>
    </Card>
  );
}
