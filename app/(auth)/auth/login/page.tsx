import { Metadata } from "next";
import { LoginForm } from "@/components/auth-pages/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to the Oopsy admin console",
};

export default function LoginPage() {
  return <LoginForm />;
}
