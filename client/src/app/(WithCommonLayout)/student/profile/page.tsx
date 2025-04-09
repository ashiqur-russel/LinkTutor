import React from "react";
import { Button } from "@/components/ui/button";
import { Star, Mail, Phone, MapPin, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* Left Column (Profile Info) */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start">
            <div className="mb-4">
              <Image
                src="/assets/tutor/tutor.avif" // Replace with actual image URL
                alt="Profile"
                width={150}
                height={150}
                className="rounded-full w-32 h-32 object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 text-center md:text-left">
              Jeremy Rose
            </h1>
            <p className="text-gray-600 text-center md:text-left mb-4">
              Product Designer
            </p>

            <div className="flex items-center justify-center md:justify-start mb-4">
              <span className="text-xl font-semibold mr-2">8.6</span>
              <Star className="text-yellow-500 w-5 h-5" />
              <Star className="text-yellow-500 w-5 h-5" />
              <Star className="text-yellow-500 w-5 h-5" />
              <Star className="text-yellow-500 w-5 h-5" />
              <Star className="text-gray-300 w-5 h-5" />{" "}
              {/* Assuming 4.3 rating */}
            </div>

            <div className="flex justify-center md:justify-start space-x-2 mb-4">
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Send message
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Contacts
              </Button>
            </div>
            <div className="flex justify-center md:justify-start">
              <Button variant="ghost" size="sm" className="text-gray-600">
                Report user
              </Button>
            </div>

            <div className="mt-8 w-full">
              <div className="flex space-x-4 mb-4 justify-center md:justify-start">
                <Button
                  variant="ghost"
                  className="text-gray-700 font-semibold px-0"
                >
                  Timeline
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-700 font-semibold px-0"
                >
                  About
                </Button>
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">WORK</h2>
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-700">
                  Spotify New York
                </h3>
                <p className="text-sm text-gray-500">
                  170 William Street <br />
                  New York, NY 10038-78 <br />
                  212-312-51
                </p>
                <Badge variant="secondary" className="mt-1">
                  Primary
                </Badge>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-700">
                  Metropolitan Museum
                </h3>
                <p className="text-sm text-gray-500">
                  525 E 68th Street <br />
                  New York, NY 10651-78 <br />
                  156-187-60
                </p>
                <Badge variant="secondary" className="mt-1">
                  Secondary
                </Badge>
              </div>

              <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Branding</Badge>
                <Badge variant="outline">UI/UX</Badge>
                <Badge variant="outline">Web-Design</Badge>
                <Badge variant="outline">Packaging</Badge>
                <Badge variant="outline">Print & Editorial</Badge>
              </div>
            </div>
          </div>

          {/* Right Column (Contact & Basic Info) */}
          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              CONTACT INFORMATION
            </h2>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Phone className="mr-2 h-5 w-5 text-gray-600" />
                <span className="text-gray-700">+1 123 456 7890</span>
              </div>
              <div className="flex items-start mb-2">
                <MapPin className="mr-2 mt-1 h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  525 E 68th Street <br />
                  New York, NY 10651-78 <br />
                  156-187-60
                </span>
              </div>
              <div className="flex items-center mb-2">
                <Mail className="mr-2 h-5 w-5 text-gray-600" />
                <span className="text-gray-700">hello@jeremyrose.com</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Site:</span>
                <a
                  href="http://www.jeremyrose.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  www.jeremyrose.com
                </a>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-4">
              BASIC INFORMATION
            </h2>
            <div className="mb-2 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-gray-600" />
              <span className="text-gray-700">Birthday: June 5, 1992</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-5 w-5 text-gray-600" />
              <span className="text-gray-700">Gender: Male</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Badge component (simplified)
const Badge = ({
  variant,
  className,
  children,
}: {
  variant?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  let baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  if (variant === "secondary") {
    baseClasses += " bg-gray-100 text-gray-800";
  } else if (variant === "outline") {
    baseClasses += " text-gray-700 ring-1 ring-gray-200";
  } else {
    baseClasses += " bg-gray-800 text-white"; // Default
  }

  return <span className={cn(baseClasses, className)}>{children}</span>;
};

export default ProfilePage;
