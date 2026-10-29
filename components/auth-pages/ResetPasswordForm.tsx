"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { AuthLayoutWrapper } from "./AuthLayoutWrapper";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      setServerError(
        "Reset token is missing or expired. Please request a new password reset code."
      );
      return;
    }

    try {
      setServerError(null);
      await resetPassword({
        token,
        newPassword: data.password,
      }).unwrap();

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Failed to reset password. The link or token may be expired.";
      setServerError(msg);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      {/* Header / Welcome Text */}
      <div className="space-y-1 text-left">
        <h1 className="text-2xl font-bold tracking-tight text-[#005461] sm:text-3xl">
          Reset Password
        </h1>
        <p className="text-sm text-[#005461]/70 font-normal">
          Create a new password for your account.
        </p>
      </div>

      {/* Alerts */}
      {serverError && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p className="font-medium text-xs leading-relaxed">{serverError}</p>
        </div>
      )}

      {isSuccess && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
          <p className="font-medium text-xs leading-relaxed">
            Password reset successful! Redirecting to sign in...
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-xs font-semibold tracking-wider text-[#005461]/70 uppercase"
          >
            NEW PASSWORD
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter new password"
              {...register("password")}
              className="h-12 pr-10 bg-white/80 border-white/60 rounded-xl text-[#005461] placeholder:text-[#005461]/40 focus-visible:ring-[#005461]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#005461]/50 hover:text-[#005461] transition-colors"
              tabIndex={-1}
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
              autoComplete="new-password"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              className="h-12 pr-10 bg-white/80 border-white/60 rounded-xl text-[#005461] placeholder:text-[#005461]/40 focus-visible:ring-[#005461]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#005461]/50 hover:text-[#005461] transition-colors"
              tabIndex={-1}
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

        <Button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full h-12 text-base font-semibold bg-[#005461] hover:bg-[#00424d] text-white rounded-xl shadow-none mt-2 cursor-pointer transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Resetting Password...</span>
            </div>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>

      {/* Back to login */}
      <div className="text-center text-sm">
        <Link
          href="/auth/login"
          className="font-semibold text-[#005461] hover:underline"
        >
          Back to Sign in
        </Link>
      </div>
    </div>
  );
}

export function ResetPasswordForm() {
  return (
    <AuthLayoutWrapper>
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-[#005461]" />
          </div>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </AuthLayoutWrapper>
  );
}
