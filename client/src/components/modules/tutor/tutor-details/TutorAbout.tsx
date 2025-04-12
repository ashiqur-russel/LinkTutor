"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function TutorAbout({ tutor }: { tutor: any }) {
  const [showFull, setShowFull] = useState(false);
  return (
    <Card className=" border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="">{tutor.shortBio}</p>
        <p className={cn("mt-4", showFull ? "block" : "line-clamp-3")}>
          {tutor.fullBio}
        </p>
        <button
          onClick={() => setShowFull(!showFull)}
          className="text-blue-400 hover:text-blue-300 mt-2 text-sm"
        >
          {showFull ? "Show less" : "Show more"}
        </button>
        <div className="mt-6">
          <h3 className="text-lg font-semibold  mb-2">I speak</h3>
          <div className="flex flex-wrap gap-2">
            {tutor.languages.map((lang: string, i: number) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-gray-700 text-white border-gray-600"
              >
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
