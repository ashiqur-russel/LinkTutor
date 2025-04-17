"use client";

import * as React from "react";
import {
  SquareTerminal,
  CircleDollarSign,
  MessageSquare,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useUser } from "@/context/UserContext";
import { NavMain } from "../nav-main";
import { NavUser } from "../nav-users";

const sidebarDataByRole = {
  tutor: [
    {
      title: "Dashboard",
      url: "/tutor/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Earnings",
      icon: CircleDollarSign,
      url: "/tutor/dashboard/earning-history",
    },
  ],
  student: [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: SquareTerminal,
    },

    {
      title: "Request History",
      url: "/student/lesson-request",
      icon: MessageSquare,
    },
    {
      title: "Reviews",
      url: "/student/dashboard/reviews",
      icon: StarIcon,
    },
    {
      title: "My Payment",
      url: "/student/dashboard/payment-history",
      icon: CircleDollarSign,
    },
    {
      title: "My Tutors",
      url: "/student/dashboard/tutors",
      icon: UsersIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const role = user?.role as keyof typeof sidebarDataByRole;

  const sidebarItems = sidebarDataByRole[role] || [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center font-semibold text-lg">
                  Tutor Link
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
