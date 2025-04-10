"use client";

import React from "react";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { registerStudent } from "@/services/AuthService";

// Define the shape of our form data
type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  classLevel: string;
};

export default function RegisterStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      classLevel: "",
    },
  });

  const router = useRouter();
  const { setIsLoading } = useUser();

  // Handle form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerStudent(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error("Registration error:", err);
      // Show an error message
    }
  };

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] w-full max-w-lg p-8 mt-5 rounded shadow-sm">
      <h2 className="text-3xl font-bold text-center mb-6">
        Register as Student
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Student Name */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Student’s name*
          </label>
          <input
            id="name"
            type="text"
            placeholder="Student's first name*"
            className="w-full px-4 py-3 border border-[var(--border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            E-mail*
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your email*"
            className="w-full px-4 py-3 border border-[var(--border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-medium mb-1">
            Mobile number*
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Mobile number*"
            className="w-full px-4 py-3 border border-[var(--border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* classLevel */}
        <div>
          <label htmlFor="phone" className="block font-medium mb-1">
            Class Level*
          </label>
          <input
            id="classLevel"
            type="text"
            placeholder="Class Level*"
            className="w-full px-4 py-3 border border-[var(--border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            {...register("classLevel", { required: "Class Level is required" })}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Password*
          </label>
          <input
            id="password"
            type="password"
            placeholder="Your password with at least 8 characters*"
            className="w-full px-4 py-3 border border-[var(--border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-sm text-center">
          By registering, I confirm that I have read and agree to the{" "}
          <a href="#" className="text-[var(--primary)] hover:underline">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-[var(--primary)] hover:underline">
            Privacy Policy
          </a>{" "}
          of Link Tutor.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn-primary py-3 rounded-md transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register now"}
        </button>

        {/* Already have an account? */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--secondary)] font-bold hover:underline"
          >
            Sign in now
          </Link>
        </p>

        {/* Are you a tutor? */}
        <p className="text-center">
          Are you a tutor?{" "}
          <Link
            href="/register/tutor"
            className="text-[var(--secondary)] font-bold hover:underline"
          >
            Click here
          </Link>
        </p>
      </form>
    </div>
  );
}
