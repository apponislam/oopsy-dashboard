"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Check, AlertCircle, Loader2 } from "lucide-react";
import { AuthLayoutWrapper } from "./AuthLayoutWrapper";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setServerError(null);
      const res = await login({
        email: data.email.trim(),
        password: data.password,
      }).unwrap();

      if (res?.data?.accessToken && res?.data?.user) {
        dispatch(
          setUser({
            user: res.data.user,
            token: res.data.accessToken,
          })
        );
        router.push("/");
      } else {
        setServerError("Login succeeded but no token or user received.");
      }
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Invalid email or password. Please try again.";
      setServerError(msg);
    }
  };

  return (
    <AuthLayoutWrapper>
      <div className="w-full max-w-sm space-y-6">
        {/* Header / Welcome Text */}
        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-bold tracking-tight text-[#005461] sm:text-3xl">
            Welcome back
          </h1>
          <p className="text-sm text-[#005461]/70 font-normal">
            Sign in to the Oopsy admin console
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
                autoComplete="current-password"
                placeholder="Enter your password"
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

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 text-sm text-[#005461]/70 cursor-pointer select-none group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="peer sr-only"
                />
                <div className="h-5 w-5 rounded-md border-2 border-[#005461]/30 bg-white/80 transition-all peer-checked:bg-[#005461] peer-checked:border-[#005461] peer-focus-visible:ring-2 peer-focus-visible:ring-[#005461] group-hover:border-[#005461]" />
                <Check className="absolute h-3.5 w-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity stroke-3" />
              </div>
              <span>Remember me</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-semibold text-[#005461] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-base font-semibold bg-[#005461] hover:bg-[#00424d] text-white rounded-xl shadow-none cursor-pointer transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </AuthLayoutWrapper>
  );
}
