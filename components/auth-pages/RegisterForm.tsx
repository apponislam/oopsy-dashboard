"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Check } from "lucide-react";
import { AuthLayoutWrapper } from "./AuthLayoutWrapper";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Full name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Registration submitted:", data);
  };

  return (
    <AuthLayoutWrapper>
      <div className="w-full max-w-sm space-y-6">
        {/* Header / Welcome Text */}
        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-bold tracking-tight text-[#005461] sm:text-3xl">
            Create an Account
          </h1>
          <p className="text-sm text-[#005461]/70 font-normal">
            Sign up to get started with the oopsy admin console
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="text-xs font-semibold tracking-wider text-[#005461]/70 uppercase"
            >
              FULL NAME
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              {...register("fullName")}
              className="h-11 bg-white/80 border-white/60 rounded-xl text-[#005461] placeholder:text-[#005461]/40 focus-visible:ring-[#005461]"
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold tracking-wider text-[#005461]/70 uppercase"
            >
              EMAIL
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className="h-11 bg-white/80 border-white/60 rounded-xl text-[#005461] placeholder:text-[#005461]/40 focus-visible:ring-[#005461]"
            />
            {errors.email && (
              <p className="text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold tracking-wider text-[#005461]/70 uppercase"
            >
              PASSWORD
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                className="h-11 pr-10 bg-white/80 border-white/60 rounded-xl text-[#005461] placeholder:text-[#005461]/40 focus-visible:ring-[#005461]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#005461]/50 hover:text-[#005461] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-semibold tracking-wider text-[#005461]/70 uppercase"
            >
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("confirmPassword")}
                className="h-11 pr-10 bg-white/80 border-white/60 rounded-xl text-[#005461] placeholder:text-[#005461]/40 focus-visible:ring-[#005461]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#005461]/50 hover:text-[#005461] transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"}
                </span>
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="pt-1">
            <label className="flex items-center gap-2.5 text-sm text-[#005461]/70 cursor-pointer select-none group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  {...register("acceptTerms")}
                  className="peer sr-only"
                />
                <div className="h-5 w-5 rounded-md border-2 border-[#005461]/30 bg-white/80 transition-all peer-checked:bg-[#005461] peer-checked:border-[#005461] peer-focus-visible:ring-2 peer-focus-visible:ring-[#005461] group-hover:border-[#005461]" />
                <Check className="absolute h-3.5 w-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity stroke-3" />
              </div>
              <span className="text-xs sm:text-sm">
                I agree to the{" "}
                <Link href="#" className="font-semibold text-[#005461] hover:underline">
                  Terms & Conditions
                </Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-xs text-destructive mt-1">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 text-base font-semibold bg-[#005461] hover:bg-[#00424d] text-white rounded-xl shadow-none mt-2"
          >
            Create Account
          </Button>
        </form>

        {/* Already have an account? */}
        <div className="text-center text-sm text-[#005461]/70">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-[#005461] hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayoutWrapper>
  );
}
