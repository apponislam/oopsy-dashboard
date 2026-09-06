import { Metadata } from "next";
import { RegisterForm } from "@/components/auth-pages/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an account on the Oopsy admin console",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
