"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
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
import { isActivePath } from "@/lib/utils";

export default function Navbar({
  onOpenContactModal,
}: {
  onOpenContactModal: () => void;
}) {
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
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex px-8 py-6 justify-between lg:justify-evenly items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-primary text-xl font-bold cursor-pointer">
            LinkTutor
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:space-x-6 md:justify-center md:w-full lg:ml-10">
          {navLinks.map(({ label, href }) => {
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-2 py-1 ${
                  active
                    ? "text-teal-600 font-semibold after:content-[''] after:absolute after:w-full after:h-1 after:bg-teal-600 after:bottom-0 after:left-0"
                    : "text-gray-800"
                } hover:text-teal-600`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex md:items-center md:ml-auto">
          {!user && (
            <div
              className="flex items-center space-x-4 mr-6 cursor-pointer hover:text-teal-600"
              onClick={onOpenContactModal}
            >
              <div className="flex items-center">
                <FiPhone className="mr-1 text-teal-500" />
                <span className="text-gray-800 text-sm">Contact</span>
                </div>
             
            </div>
          )}
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
          {!user && (
            <button
              onClick={onOpenContactModal}
              className="flex items-center hover:text-teal-600"
            >
              <FiPhone className="mr-1 text-teal-500" />
              <span className="text-gray-800 text-sm">Contact</span>
            </button>
          )}
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
          <div
            onClick={onOpenContactModal}
            className="flex items-center justify-center cursor-pointer hover:text-teal-600"
          >
            <FiPhone className="mr-1 text-teal-500" />
            <span className="text-gray-800 text-sm">0800 20 40 30 40</span>
          </div>
          <span className="block text-gray-500 text-sm">
            Free hotline / Mon-Fri 9am-2pm
          </span>
          {navLinks.map(({ label, href }) => {
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-2 py-1 ${
                  active
                    ? "text-teal-600 font-semibold after:content-[''] after:absolute after:w-full after:h-1 after:bg-teal-600 after:bottom-0 after:left-0"
                    : "text-gray-800"
                } hover:text-teal-600 block`}
              >
                {label}
              </Link>
            );
          })}

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
