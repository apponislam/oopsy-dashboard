"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { AuthLayoutWrapper } from "./AuthLayoutWrapper";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "6-digit OTP code is required" })
    .max(6, { message: "6-digit OTP code is required" }),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export function VerifyOtpForm() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const onSubmit = (data: OtpFormValues) => {
    console.log("OTP verified:", data);
    router.push("/auth/reset-password");
  };

  return (
    <AuthLayoutWrapper>
      <div className="w-full max-w-sm space-y-6">
        {/* Header / Welcome Text */}
        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-bold tracking-tight text-[#005461] sm:text-3xl">
            Verify OTP
          </h1>
          <p className="text-sm text-[#005461]/70 font-normal">
            Enter the 6-digit verification code sent to your email.
          </p>
        </div>

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
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-[#005461] hover:bg-[#00424d] text-white rounded-xl shadow-none"
          >
            Verify Code
          </Button>
        </form>

        {/* Resend Code */}
        <div className="text-center text-sm text-[#005461]/70">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={() => console.log("Resend OTP clicked")}
            className="font-semibold text-[#005461] hover:underline bg-transparent border-0 cursor-pointer"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </AuthLayoutWrapper>
  );
}
