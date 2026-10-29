"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { AuthLayoutWrapper } from "./AuthLayoutWrapper";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/features/auth/authApi";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "6-digit OTP code is required" })
    .max(6, { message: "6-digit OTP code is required" }),
});

type OtpFormValues = z.infer<typeof otpSchema>;

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    const combined = newDigits.join("");
    setValue("otp", combined, { shouldValidate: true });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newDigits = pasteData.split("").concat(Array(6 - pasteData.length).fill(""));
      setDigits(newDigits.slice(0, 6));
      setValue("otp", pasteData, { shouldValidate: true });
      inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
    }
  };

  const onSubmit = async (data: OtpFormValues) => {
    if (!email) {
      setServerError("Email is missing. Please start over from the forgot password page.");
      return;
    }

    try {
      setServerError(null);
      const res = await verifyOtp({ email, otp: data.otp }).unwrap();
      const token = res?.data?.token;

      if (token) {
        router.push(
          `/auth/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
        );
      } else {
        setServerError("Verification succeeded but no reset token was returned.");
      }
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Invalid or expired OTP code. Please try again.";
      setServerError(msg);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setServerError("Email is missing. Please start over from the forgot password page.");
      return;
    }

    try {
      setServerError(null);
      setResendSuccess(null);
      await resendOtp({ email }).unwrap();
      setResendSuccess("A new OTP code has been sent to your email.");
      setTimeout(() => setResendSuccess(null), 5000);
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Could not resend OTP. Please try again later.";
      setServerError(msg);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      {/* Header / Welcome Text */}
      <div className="space-y-1 text-left">
        <h1 className="text-2xl font-bold tracking-tight text-[#005461] sm:text-3xl">
          Verify OTP
        </h1>
        <p className="text-sm text-[#005461]/70 font-normal">
          {email ? (
            <>
              Enter the 6-digit code sent to{" "}
              <span className="font-semibold text-[#005461]">{email}</span>
            </>
          ) : (
            "Enter the 6-digit verification code sent to your email."
          )}
        </p>
      </div>

      {/* Alerts */}
      {serverError && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p className="font-medium text-xs leading-relaxed">{serverError}</p>
        </div>
      )}

      {resendSuccess && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
          <p className="font-medium text-xs leading-relaxed">{resendSuccess}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold tracking-wider text-[#005461]/70 uppercase">
            VERIFICATION CODE
          </label>
          <div className="flex gap-2 justify-between">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-bold bg-white/80 border border-white/60 rounded-xl text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]"
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-xs text-destructive mt-1">
              {errors.otp.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isVerifying}
          className="w-full h-12 text-base font-semibold bg-[#005461] hover:bg-[#00424d] text-white rounded-xl shadow-none cursor-pointer transition-colors"
        >
          {isVerifying ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            "Verify Code"
          )}
        </Button>
      </form>

      {/* Resend Code */}
      <div className="text-center text-sm text-[#005461]/70">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="font-semibold text-[#005461] hover:underline bg-transparent border-0 cursor-pointer disabled:opacity-50"
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
      </div>

      {/* Back link */}
      <div className="text-center text-sm">
        <Link
          href="/auth/forgot-password"
          className="font-medium text-xs text-[#005461]/70 hover:underline"
        >
          Change email address
        </Link>
      </div>
    </div>
  );
}

export function VerifyOtpForm() {
  return (
    <AuthLayoutWrapper>
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-[#005461]" />
          </div>
        }
      >
        <VerifyOtpContent />
      </Suspense>
    </AuthLayoutWrapper>
  );
}
