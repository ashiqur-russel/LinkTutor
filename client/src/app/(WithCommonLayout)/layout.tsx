"use client";

import Footer from "@/components/shared/Footer";
import dynamic from "next/dynamic";

const ClientNavbar = dynamic(() => import("@/components/shared/Navbar"), {
  ssr: false,
});

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <ClientNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
