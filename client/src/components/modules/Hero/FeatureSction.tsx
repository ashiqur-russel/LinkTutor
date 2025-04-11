"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Users, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const TutorLinkFeatures = () => {
  const features = [
    {
      icon: <Users className="text-blue-600 w-8 h-8" />,
      title: "Connect with Students",
      description:
        "Easily manage and engage with your students through one unified platform.",
    },
    {
      icon: <CalendarCheck className="text-green-600 w-8 h-8" />,
      title: "Seamless Scheduling",
      description:
        "Book and manage your sessions with smart reminders and calendar integrations.",
    },
    {
      icon: <Check className="text-purple-600 w-8 h-8" />,
      title: "Secure Payments",
      description:
        "Get paid fast and securely, with detailed history and analytics.",
    },
    {
      icon: <Sparkles className="text-yellow-500 w-8 h-8" />,
      title: "Customizable Profiles",
      description:
        "Showcase your expertise with a beautiful, editable tutor profile page.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white px-6 py-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Our Key Features
        </h1>
        <p className="text-gray-600 text-lg">
          Empower your teaching journey with modern tools crafted to make
          tutoring easier, smarter, and more rewarding.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="hover:shadow-xl transition-shadow h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mt-2">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10"
      >
        {" "}
        <Button className="rounded-full px-6 py-2 text-lg cusror-pointe">
          <Link href={"/login"}> Get Started Now </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default TutorLinkFeatures;
