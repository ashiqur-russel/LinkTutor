"use client";
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AvatarCardProps {
  isActive: boolean;
  imageUrl?: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ isActive, imageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl);
  const [file, setFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
      setFile(selectedFile);
      setIsUploaded(false);
    }
  };

  const handleUpload = () => {
    if (!file) return;

   
    setIsUploaded(true);
  };

  return (
    <div className="relative">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Avatar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32 rounded-full border-2 border-gray-500 dark:border-gray-400 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Profile"
                    width={150}
                    height={150}
                    className="rounded-full w-32 h-32 object-cover"
                  />
                ) : (
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
                )}
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <Button variant="outline" type="button" onClick={handleSelectImage}>
              {previewUrl ? "Change Image" : "Select Image"}
            </Button>

            {file && !isUploaded && (
              <Button type="button" onClick={handleUpload} className="ml-2">
                Upload
              </Button>
            )}
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
};

export default AvatarCard;
