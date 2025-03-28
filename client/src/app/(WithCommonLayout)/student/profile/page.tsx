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

// Example student data (In a real app, fetch from your API or DB)
const studentData = {
  _id: "67cb2e5e8307779921dea369",
  name: "Alice Student",
  email: "alice@student.com",
  phone: "1234567890",
  role: "student",
  classLevel: "10",
  guardian: {
    name: "Bob Guardian",
    phone: "0987654321",
    email: "bob.guardian@example.com",
    relationship: "father",
  },
  address: {
    street: "456 College Ave",
    city: "Metropolis",
    state: "CA",
    postalCode: "98765",
    country: "USA",
  },
  createdAt: "2025-03-07T17:35:26.227Z",
  updatedAt: "2025-03-16T14:36:42.476Z",
};

export default function StudentProfilePage() {
  return (
    <section className="container mx-auto px-4 py-10">
      {/* Profile Header Card (Photo + Name) */}
      <ProfilePhotoCard user={studentData} />

      {/* Personal Info Card */}
      <PersonalInfoCard user={studentData} />

      {/* Address Card */}
      <AddressCard address={studentData.address} />

      {/* Guardian & Class Level Card */}
      <GuardianCard
        guardian={studentData.guardian}
        classLevel={studentData.classLevel}
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

// Guardian & Class Level Card
function GuardianCard({
  guardian,
  classLevel,
}: {
  guardian: any;
  classLevel: string;
}) {
  if (!guardian) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Guardian & Class Level</CardTitle>
        <CardDescription>Parent/Guardian details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <span className="font-semibold">Class Level: </span>
          {classLevel}
        </p>
        <p>
          <span className="font-semibold">Guardian Name: </span>
          {guardian.name}
        </p>
        <p>
          <span className="font-semibold">Guardian Email: </span>
          {guardian.email}
        </p>
        <p>
          <span className="font-semibold">Guardian Phone: </span>
          {guardian.phone}
        </p>
        <p>
          <span className="font-semibold">Relationship: </span>
          {guardian.relationship}
        </p>
      </CardContent>
    </Card>
  );
}
