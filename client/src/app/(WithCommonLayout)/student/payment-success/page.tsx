"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Payment Successful!</h1>
      <p>
        Thank you for your purchase! Your lesson request has been successfully
        processed.
      </p>
      <p>You will be contacted shortly with further details.</p>
    </div>
  );
};

export default PaymentSuccess;
