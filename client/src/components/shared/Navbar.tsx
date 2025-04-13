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

import { commonLinks, roleBasedLinks } from "@/constants/navLinks";
import { protectedRoutes } from "@/constants";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const navLinks = [
    ...commonLinks,
    ...(user?.role ? roleBasedLinks[user.role] ?? [] : []),
  ];

  const userMenuItems = [
    { label: "Profile", href: `/${user?.role}/profile` },
    { label: "Dashboard", href: `/${user?.role}/dashboard` },
    { label: "My Bookings", href: `/${user?.role}/bookings` }, // adjust if needed
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex px-8 py-6 justify-between lg:justify-evenly">
        {/* Logo */}
        <Link href="/">
          <span className="text-primary text-xl font-bold cursor-pointer">
            LinkTutor
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:space-x-6 md:justify-center md:w-full lg:ml-10">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-800 hover:text-teal-600"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex md:items-center md:ml-auto">
          {!user ? (
            <Link href="/login" className="btn-gold-outline">
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
                {userMenuItems.map(({ label, href }) => (
                  <DropdownMenuItem key={href}>
                    <Link href={href}>{label}</Link>
                  </DropdownMenuItem>
                ))}
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

        {/* Mobile Right Section */}
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
                {userMenuItems.map(({ label, href }) => (
                  <DropdownMenuItem key={href}>
                    <Link href={href}>{label}</Link>
                  </DropdownMenuItem>
                ))}
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
        <div className="md:hidden bg-white shadow-md p-4 space-y-3 text-center">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="block text-gray-800 hover:text-teal-600"
            >
              {label}
            </Link>
          ))}

          {user && (
            <div className="mt-3 space-y-2">
              {userMenuItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-gray-800 hover:text-teal-600"
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={handleLogOut}
                className="text-left bg-secondary text-white px-4 py-1 rounded-md w-full"
              >
                <span className="inline-flex items-center">
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
