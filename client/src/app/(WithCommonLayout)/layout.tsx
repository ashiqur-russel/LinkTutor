"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ContactModal from "@/components/modules/modal/shared/ContactModal";
import Footer from "@/components/shared/Footer";

const ClientNavbar = dynamic(() => import("@/components/shared/Navbar"), {
  ssr: false,
});

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <ClientNavbar
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />
      <main className="flex-grow">{children}</main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
