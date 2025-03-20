import Image from "next/image";
import { Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tutors = [
  {
    name: "Jane Smith",
    photoUrl: "/tutors/tutor1.jpg",
    subjects: ["Math", "Physics"],
    level: "High School",
    rating: 4.8,
  },
  {
    name: "Michael Brown",
    photoUrl: "/tutors/tutor2.jpg",
    subjects: ["English", "History", "Literature"],
    level: "University",
    rating: 4.5,
  },
  {
    name: "Alice Johnson",
    photoUrl: "/tutors/tutor3.jpg",
    subjects: ["Biology", "Chemistry"],
    level: "A-Level",
    rating: 4.9,
  },
];

export default function TutorsPage() {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
          Meet Our Tutors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tutors.map((tutor, idx) => (
            <Card key={idx} className="flex flex-col">
              <CardHeader className="flex items-center space-x-4">
                <Image
                  src={tutor.photoUrl}
                  alt={tutor.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <CardTitle>{tutor.name}</CardTitle>
                  <CardDescription>{tutor.level}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tutor.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-600"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="ml-1 text-sm font-medium">
                    {tutor.rating}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">/ 5</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="default">Book</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="bg-gray-200">
            See all tutors
          </Button>
        </div>
      </div>
    </section>
  );
}
