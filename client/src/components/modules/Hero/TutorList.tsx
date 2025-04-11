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
import { getDisplayedTutor } from "@/services/TutorService";
import Link from "next/link";
import { ITutor } from "@/types";

export default async function TutorsPage() {
  const tutors = await getDisplayedTutor();

  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
          Meet Our Tutors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tutors?.data.map((tutor: ITutor) => (
            <Card key={tutor.email} className="flex flex-col">
              <CardHeader className="flex items-center space-x-4">
                {" "}
                <Image
                  src={
                    tutor?.photoUrl ||
                    "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={tutor.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <CardTitle>{tutor.name}</CardTitle>
                  <CardDescription>{tutor.hourRate}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tutor?.subjects?.map((subject) => (
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
                    {tutor?.rating}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">/ 5</span>
                </div>
              </CardContent>

              <CardFooter>
                <div className="mt-4 flex gap-2 w-full flex-col">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    Book a session
                  </Button>
                  <Button variant="outline" className="border-gray-300">
                    Send Message
                  </Button>
                </div>{" "}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href={"/tutor"}>
            {" "}
            <Button className="rounded-full px-6 py-2 text-lg cusror-pointe">
              See all tutors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
