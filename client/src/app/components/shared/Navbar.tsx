"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { protectedRoutes } from "@/app/constants";
import { useUser } from "@/app/context/UserContext";
import { logout } from "@/app/services/AuthService";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);

    // If the current path is protected, redirect user to home
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <span className="text-primary text-2xl font-bold cursor-pointer">
            LinkTutor
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:space-x-6 md:justify-center md:w-full lg:ml-10">
          <Link href="#" className="text-gray-800 hover:text-teal-600">
            ABOUT US
          </Link>
          <Link href="#" className="text-gray-800 hover:text-teal-600">
            CONTACT
          </Link>
          <Link href="#" className="text-gray-800 hover:text-teal-600">
            FAQ
          </Link>
          <Link href="#" className="text-gray-800 hover:text-teal-600">
            NEWS
          </Link>
          {user?.role === "student" && (
            <Link href="/tutor" className="text-gray-800 hover:text-teal-600">
              TUTORS
            </Link>
          )}
          {user?.role === "student" && (
            <Link
              href="/student/lesson-request"
              className="text-gray-800 hover:text-teal-600"
            >
              MY REQUEST
            </Link>
          )}
          {user?.role === "tutor" && (
            <Link
              href="/tutor/lesson-offer"
              className="text-gray-800 hover:text-teal-600"
            >
              MY OFFER
            </Link>
          )}
        </nav>

        {/* Desktop: Right side (avatar or login) */}
        <div className="hidden md:flex md:items-center md:ml-auto ">
          {!user ? (
            <button className="btn-gold-outline">
              <Link href="/login">Login</Link>
            </button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" bg-secondary mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`${user?.role}/profile`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>My Bookings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="btn-primary text-white cursor-pointer"
                  onClick={handleLogOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile: Right side (avatar or login) + Burger Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          {!user ? (
            <Link href="/login" className="btn-gold-outline px-3 py-1">
              Login
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-secondary mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>My Bookings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="btn-primary text-white cursor-pointer"
                  onClick={handleLogOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <button
            className="text-gray-800 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-3">
          <Link href="#" className="block text-gray-800 hover:text-teal-600">
            About Us
          </Link>
          <Link href="#" className="block text-gray-800 hover:text-teal-600">
            FAQ
          </Link>
          <Link href="#" className="block text-gray-800 hover:text-teal-600">
            Contact
          </Link>
          <Link href="#" className="block text-gray-800 hover:text-teal-600">
            NEWS
          </Link>
          <Link href="/tutor" className="text-gray-800 hover:text-teal-600">
            TUTORS
          </Link>

          {user?.role === "student" && (
            <Link
              href="/student/lesson-request"
              className="text-gray-800 hover:text-teal-600"
            >
              MY REQUEST
            </Link>
          )}

          {user?.role === "tutor" && (
            <Link href="#" className="text-gray-800 hover:text-teal-600">
              MY OFFER
            </Link>
          )}

          {user && (
            <div className="mt-3 space-y-2">
              <Link
                href={`/${user?.role}/dashboard`}
                className="block text-gray-800 hover:text-teal-600"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogOut}
                className="text-left bg-secondary text-white px-4 py-1 rounded-md"
              >
                <span className="inline-flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
