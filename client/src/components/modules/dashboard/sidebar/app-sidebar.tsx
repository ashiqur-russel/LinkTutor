"use client";

import * as React from "react";
import { Bot, SquareTerminal, Settings } from "lucide-react";
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
      title: "Class Room",
      icon: Bot,
      url: "/tutor/dashboard",
      items: [
        { title: "Manage Bookings", url: "/tutor/dashboard/bookings" },
        { title: "Manage Payment", url: "/tutor/dashboard/payments" },
        { title: "Manage Students", url: "/tutor/dashboard/students" },
      ],
    },
    {
      title: "My Earnings",
      icon: Bot,
      url: "/tutor/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/settings",
      items: [{ title: "Profile", url: "/tutor/profile" }],
    },
  ],
  student: [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "My Request",
      url: "/student/lesson-request",
      icon: Bot,
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
                  MyApp
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
