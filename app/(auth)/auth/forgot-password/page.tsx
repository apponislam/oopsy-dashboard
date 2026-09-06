import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth-pages/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset link or verification code",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
