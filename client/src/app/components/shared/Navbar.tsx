import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <span className="text-primary text-2xl font-bold cursor-pointer">
            LinkTutor
          </span>
        </Link>
        {/* Tablet & Desktop Navigation */}
        <nav className="hidden md:flex md:space-x-6 md:justify-center md:w-full lg:ml-10">
          <Link href="#" className="text-gray-800 hover:text-teal-600">
            For Students
          </Link>
          <Link href="#" className="text-gray-800 hover:text-teal-600">
            For Schools
          </Link>
          <Link href="#" className="text-gray-800 hover:text-teal-600">
            For Tutors
          </Link>
        </nav>
        {/* Mobile & Tablet Menu Button */}
        <div className="md:flex md:items-center md:ml-auto hidden">
          <button className="btn-gold-outline">
            {" "}
            <Link href={"/login"}>Login</Link>
          </button>
        </div>{" "}
        <button
          className="md:hidden text-gray-800 text-2xl ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile & Tablet Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-3">
          <Link href="#" className="block text-gray-800 hover:text-teal-600">
            For Students
          </Link>
          <Link href="#" className="block text-gray-800 hover:text-teal-600">
            For Tutors
          </Link>
          <Link href="#" className="block text-gray-800 hover:text-teal-600">
            For Schools
          </Link>

          <div className="flex items-center space-x-4 mt-3"></div>
          <button className="border border-gold-200 text-gold px-4 py-1 cursor-pointer rounded-md w-full mt-3">
            <Link href={"/login"}> Login</Link>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
