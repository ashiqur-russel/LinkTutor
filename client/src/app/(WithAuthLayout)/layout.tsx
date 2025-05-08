import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-white shadow-md top-0 z-50 ">
        <div className=" mx-auto px-4 flex items-center justify-between md:px-6 lg:px-8 h-23">
          {/* Logo */}
          <Link href="/">
            <span className="text-primary text-xl font-bold cursor-pointer">
              LinkTutor
            </span>
          </Link>
        </div>
      </header>

      <div className="">
        {children}
      </div>
    </>
  );
}
