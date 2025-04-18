import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Star } from "lucide-react";
import Image from "next/image";
import PhotoTutor from "../../../../../public/assets/tutor/tutor.avif";

type TutorSidebarProps = {
  tutor: any,
  reviews: any,

}

export default function TutorSidebar({ tutor,reviews }: TutorSidebarProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader>
        <div className="w-full items-center justify-center">
          <Image
            src={PhotoTutor}
            alt="tutorphoto"
            width={350}
            height={200}
            className="rounded-md object-cover"
          />{" "}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-lg font-semibold text-white">{tutor.averageRating}</span>
            <span className="text-gray-400 text-sm">
              ({reviews} reviews)
            </span>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-2xl font-bold text-white">€{tutor.hourRate}</span>
          <span className="text-gray-400 text-sm"> / 60-min lesson</span>
        </div>
        <Button className="w-full bg-pink-500 text-white hover:bg-pink-600 mb-4">
          Request a lesson
        </Button>
        <Button
          variant="outline"
          className="w-full text-blue-400 hover:bg-gray-700 hover:text-white border-gray-600 mb-4"
        >
          <MessageCircle className="mr-2 h-4 w-4" /> Send message
        </Button>
        <Button
          variant="ghost"
          className="w-full text-white hover:bg-gray-700 border-gray-600"
        >
          <Heart className="mr-2 h-4 w-4" /> Save to my list
        </Button>
        <div className="mt-6">
         
        </div>
      </CardContent>
    </Card>
  );
}
