"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      // If sessionId exists, redirect to another page, like "/tutor"
      router.push("/tutor");
    }
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full"
      >
        <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-green-800">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your payment is on hold until tutor
          accepts your request. You'll be notified once the tutor responds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/student/dashboard/payment-history`}>
            <Button className="rounded-full px-6">Go to Dashboard</Button>
          </Link>
          <Link href={`/student/lesson-request`}>
            <Button variant="outline" className="rounded-full px-6">
              View Requests
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
