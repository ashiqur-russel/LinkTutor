"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Are the tutors on LinkTutor verified?",
    answer:
      "Yes, every tutor on LinkTutor goes through a strict verification process, including identity checks and qualification reviews to ensure authenticity and safety for our students.",
  },
  {
    question: "Is my payment safe on this platform?",
    answer:
      "Absolutely. Payments are processed through a secure escrow system. Funds are held until the tutor confirms the session and completes it successfully. If the session is canceled or not accepted, you will not be charged.",
  },
  {
    question: "What if a tutor doesn't show up or cancels?",
    answer:
      "If a tutor cancels or doesn't attend a scheduled session, student will report it and we will refund full ammount.",
  },
  {
    question: "Can I request a refund if I'm not satisfied?",
    answer:
      "Yes, we have a student protection policy. If you’re not satisfied with your session, you can report it within 24 hours, and our support team will assess and process a partial or full refund where applicable.",
  },
  {
    question: "How do I communicate with tutors before booking?",
    answer:
      "You would able to chat with tutors directly on our platform to discuss availability, teaching style, or ask any questions before making a booking.We are working on it",
  },
  {
    question: "When is the payment released to the tutor?",
    answer:
      "The tutor only receives the payment after the session is marked complete by both parties or after 24 hours of the session if no issue is reported.",
  },

  {
    question: "What payment methods are supported?",
    answer:
      "We support all major credit/debit cards. All transactions are encrypted and handled via industry-standard secure payment gateways.",
  },
  {
    question: "Is LinkTutor free to use for students?",
    answer:
      "Yes, there are no subscription fees for students. You only pay per session or package you book with a tutor.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-7 fcfcfc" id="faq">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mb-12"
        ></motion.div>

        <h2 className="text-2xl font-semibold mb-8">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto text-left space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              >
                <span className="text-white font-medium text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  } text-white`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="overflow-hidden px-4 pb-4 text-gray-300 text-sm"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
