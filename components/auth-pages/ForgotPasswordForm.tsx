"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";
import { AuthLayoutWrapper } from "./AuthLayoutWrapper";
import { useRequestPasswordResetMutation } from "@/redux/features/auth/authApi";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setServerError(null);
      await requestPasswordReset({ email: data.email.trim() }).unwrap();
      router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email.trim())}`);
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Could not send password reset code. Please check your email and try again.";
      setServerError(msg);
    }
  };

  return (
    <AuthLayoutWrapper>
      <div className="w-full max-w-sm space-y-6">
        {/* Header / Welcome Text */}
        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-bold tracking-tight text-[#005461] sm:text-3xl">
            Forgot Password?
          </h1>
          <p className="text-sm text-[#005461]/70 font-normal">
            Enter your registered email address to receive a verification code.
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p className="font-medium text-xs leading-relaxed">{serverError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              autoComplete="email"
              placeholder="Enter your email address"
              {...register("email")}
              className="h-12 bg-white/80 border-white/60 rounded-xl text-[#005461] placeholder:text-[#005461]/40 focus-visible:ring-[#005461]"
            />
            {errors.email && (
              <p className="text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-base font-semibold bg-[#005461] hover:bg-[#00424d] text-white rounded-xl shadow-none mt-2 cursor-pointer transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending OTP...</span>
              </div>
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>

        {/* Back to login */}
        <div className="text-center text-sm text-[#005461]/70">
          Remember your password?{" "}
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
