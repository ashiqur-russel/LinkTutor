import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Search, Users, BookOpen } from "lucide-react";

import React from "react";

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Find and contact private tutors
        </h1>
        <p className="text-gray-600 text-lg">
          Find out how to use LinkTutors to find your tutor
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-col items-start space-y-2">
            <Search className="h-6 w-6 text-primary" />
            <CardTitle>Find and contact tutors</CardTitle>
            <CardDescription>
              You have access to one of the largest ranges of tutors in Europe.
            </CardDescription>
          </CardHeader>
          <CardContent>{/*  details or CTA button */}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col items-start space-y-2">
            <Users className="h-6 w-6 text-primary" />
            <CardTitle>Choose the perfect tutor from just €8/hr</CardTitle>
            <CardDescription>
              Find your ideal tutor based on your needs, level, budget, etc.
            </CardDescription>
          </CardHeader>
          <CardContent>{/*  details or CTA button */}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col items-start space-y-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle>Learn at your own pace</CardTitle>
            <CardDescription>
              Learn faster with fully personalised private lessons.
            </CardDescription>
          </CardHeader>
          <CardContent>{/*  details or CTA button */}</CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;
