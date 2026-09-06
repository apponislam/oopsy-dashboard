import { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth-pages/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your account",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
