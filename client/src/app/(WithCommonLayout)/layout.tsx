"use client";

import dynamic from "next/dynamic";
import Footer from "../components/shared/Footer";

const ClientNavbar = dynamic(() => import("@/app/components/shared/Navbar"), {
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
