import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-white shadow-md top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between md:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/">
            <span className="text-primary text-2xl font-bold cursor-pointer">
              LinkTutor
            </span>
          </Link>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[80vh]">
        {children}
      </div>
    </div>
  );
}
