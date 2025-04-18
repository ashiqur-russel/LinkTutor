"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TutorAboutProps = {
  tutor:any
}

export default function TutorAbout({ tutor }:TutorAboutProps) {
  const [showFull, setShowFull] = useState(false);


  return (
    <Card className=" border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">About Me</CardTitle>
      </CardHeader>
      <CardContent>
       {
        tutor?.aboutMe?.length > 0 ? (
          <p
            className={cn(
              "text-gray-400",
              showFull ? "line-clamp-none" : "line-clamp-3"
            )}
          >
            {tutor?.aboutMe}
          </p>
        ) : (
          <p className="text-gray-400">No description available.</p>
        )
       }
    {
        tutor?.aboutMe?.length > 0 && (
          <button
            className="text-blue-500 mt-2"
            onClick={() => setShowFull(!showFull)}
          >
            {showFull ? "Show Less" : "Read More"}
          </button>
        )
    }
       <div className="mt-6">
  <h3 className="text-lg font-semibold mb-2">I speak</h3>
  <div className="flex flex-wrap gap-2">
    {(tutor?.languages && tutor.languages.length > 0 ? tutor.languages : ["English"]).map(
      (lang: string, i: number) => (
        <Badge
          key={i}
          variant="secondary"
          className="bg-gray-700 text-white border-gray-600"
        >
          {lang}
        </Badge>
      )
    )}
  </div>
</div>

      </CardContent>
    </Card>
  );
}
