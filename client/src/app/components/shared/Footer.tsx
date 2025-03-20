import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react"; // or any icons you like

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Brand & Description */}
          <div className="md:w-1/3">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              LinkTutors
            </Link>
            <p className="mt-2 text-gray-600 max-w-sm leading-relaxed">
              Connecting learners with the best private tutors worldwide.
              Discover expert guidance for every subject, level, and style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-16">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Company
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <Link href="/about" className="hover:text-blue-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-blue-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-600">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Support
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <Link href="/contact" className="hover:text-blue-600">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-blue-600">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-blue-600">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Legal
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <Link href="/terms" className="hover:text-blue-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-blue-600">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} LinkTutors. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
