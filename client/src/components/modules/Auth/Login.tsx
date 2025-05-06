"use client";

import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/AuthService";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface LoginFormFields {
  email: string;
  password: string;
}

const Login = () => {
  const { setUser, setIsLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<LoginFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = form;

  const redirectPath = searchParams.get("redirectPath");

  const handleTabChange = (role: string) => {
    if (role === "student") {
      setValue("email", "alice@student.com");
      setValue("password", "kuravisma");
    } else if (role === "tutor") {
      setValue("email", "john.tutor@example.com");
      setValue("password", "kuravisma");
    }
  };

  const handleDemoLogin = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
    form.handleSubmit(onSubmit)();
  };

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        setUser(res.user);
        router.push(redirectPath || "/");
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="p-8 rounded-lg w-full max-w-sm bg-white shadow-md">
        <h1 className="text-center text-2xl font-bold">LinkTutor</h1>
        <h2 className="text-xl font-bold text-[#1E425C] text-center mb-4">
          Welcome Back!
        </h2>

    

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="w-full px-5 py-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="w-full px-5 py-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center text-sm font-semibold text-yellow-600">
              <Link href="/forgot-password" className="hover:underline">
                Forget Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#C4A046] hover:bg-[#B3953D] text-white font-bold py-3 rounded-md transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login now"}
            </Button>

      

            <div className="text-center text-sm font-semibold text-yellow-600 mt-4">
              Don&apos;t have an account yet?{" "}
              <Link href="/register/student" className="hover:underline">
                <span className="text-yellow-500">Register now</span>
              </Link>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
              Or try a quick demo:
              <Tabs defaultValue="student" className="mb-4" onValueChange={handleTabChange}>
          <TabsList className="w-full">
            <TabsTrigger value="student" className="w-1/2">
              Student
            </TabsTrigger>
            <TabsTrigger value="tutor" className="w-1/2">
              Tutor
            </TabsTrigger>
          </TabsList>
        </Tabs>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;