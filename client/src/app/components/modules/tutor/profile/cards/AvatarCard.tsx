"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AvatarCard = ({ isActive }: { isActive: boolean }) => (
  <div className="relative">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Avatar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32 rounded-full border-2 border-gray-500 dark:border-gray-400">
            <div className="absolute inset-0 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-16 h-16 text-gray-400 dark:text-gray-500"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
                <path d="M6 21h12"></path>
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    {isActive && (
      <Badge
        variant="secondary"
        className="absolute top-2 right-2 bg-green-500/20 text-green-500 border-green-500"
      >
        Active
      </Badge>
    )}
  </div>
);

export default AvatarCard;
