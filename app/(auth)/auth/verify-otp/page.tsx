import { Metadata } from "next";
import { VerifyOtpForm } from "@/components/auth-pages/VerifyOtpForm";

export const metadata: Metadata = {
  title: "Verify OTP",
  description: "Verify your email verification code",
};

export default function VerifyOtpPage() {
  return <VerifyOtpForm />;
}
