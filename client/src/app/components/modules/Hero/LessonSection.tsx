import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import inPersonImg from "../../../../../public/in-person-lessons.svg";
import onlineImg from "../../../../../public/online-lessons.svg";

export default function LessonsPage() {
  return (
    <section className="container w-full mx-auto px-4 py-10">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
        Lessons tailored to your learning style
      </h2>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center text-center">
          <CardHeader className="w-full">
            <CardTitle className="text-2xl font-semibold mb-2">
              In-person lessons
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Enjoy face-to-face learning with tutors who come directly to your
              home or meet you at a convenient location. Experience personalized
              guidance and immediate feedback in a comfortable, hands-on
              setting.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button variant="default" className="mt-4">
              Find in-person tutors
            </Button>
          </CardContent>

          <CardFooter className="pt-2 flex justify-center">
            <Image
              src={inPersonImg}
              alt="In-person lessons illustration"
              width={300}
              height={200}
            />
          </CardFooter>
        </Card>

        <Card className="flex flex-col items-center text-center">
          <CardHeader className="w-full">
            <CardTitle className="text-2xl font-semibold mb-2">
              Online lessons
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Connect with expert tutors from the comfort of your home via live
              video sessions. Enjoy flexible scheduling, convenient access to
              resources, and an engaging virtual classroom— wherever you are.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button variant="default" className="mt-4">
              Find online tutors
            </Button>
          </CardContent>

          <CardFooter className="pt-2 flex justify-center">
            <Image
              src={onlineImg}
              alt="Online lessons illustration"
              width={300}
              height={200}
            />
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
