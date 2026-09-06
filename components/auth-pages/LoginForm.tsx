"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Check } from "lucide-react";

const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log("Login data submitted:", data);
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-black">
            {/* Top on mobile (auto height), Left 55% on desktop: Background Image & Overlay Content */}
            <div className="relative w-full h-80 sm:h-95 lg:h-full lg:w-[55%] lg:min-h-screen shrink-0 overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-12">
                <Image src="/oopsy-bg.png" alt="Oopsy background" fill priority className="object-cover object-left" />

                {/* Top Bar: Logo & Slogan */}
                <div className="relative z-20 flex items-center justify-between w-full gap-2">
                    <div className="flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm">
                        <Image src="/auth/icon1.svg" alt="Oopsy logo" width={22} height={10} />
                        <span>OOPSY</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm text-right">
                        <span>
                            Clean Spaces, <br className="hidden sm:inline" /> Better Places
                        </span>
                        <Image src="/auth/icon2.svg" alt="Oopsy logo" width={22} height={10} />
                    </div>
                </div>

                {/* Middle Hero Heading & Subtitle */}
                <div className="relative z-20 flex flex-col gap-2 text-[#1A565D] max-w-xl my-auto py-4">
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#005461]">Comfort & Convenience,</h1>
                    <p className="text-sm sm:text-lg lg:text-xl font-light tracking-tight text-[#005461]">Anywhere. Find clean restrooms, showers, and luggage storage near you — instantly.</p>
                </div>

                {/* Bottom Feature Badges */}
                <div className="relative z-20 flex flex-wrap gap-2 sm:gap-3 pb-8 lg:pb-0">
                    <div className="flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm">
                        <Image src="/auth/icon3.svg" alt="Storage icon" width={18} height={18} />
                        <span>Storage</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm">
                        <Image src="/auth/icon4.svg" alt="Restrooms icon" width={18} height={18} />
                        <span>Restrooms</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm">
                        <Image src="/auth/icon5.svg" alt="Lockers icon" width={18} height={18} />
                        <span>Lockers</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm">
                        <Image src="/auth/icon6.svg" alt="Showers icon" width={18} height={18} />
                        <span>Showers</span>
                    </div>
                </div>

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background: "linear-gradient(180deg, rgba(8, 79, 92, 0.55) 0%, rgba(8, 79, 92, 0.20) 20%, rgba(8, 79, 92, 0.85) 85%, rgba(6, 58, 69, 0.91) 91%, #042830 100%)",
                    }}
                />
            </div>

            {/* Form Section: Bottom panel on mobile with rounded-t-[40px] overlapping top image; Right 45% panel on desktop with rounded-l-[40px] */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10 lg:p-16 bg-[#E2EFF1] rounded-t-[40px] rounded-b-none lg:rounded-l-[40px] lg:rounded-tr-none lg:-ml-10 -mt-10 lg:mt-0 min-h-[calc(100vh-14rem)] lg:min-h-screen">
                <div className="w-full max-w-sm space-y-6">
                    {/* Header / Welcome Text */}
                    <div className="space-y-1 text-left">
                        <h1 className="text-2xl font-bold tracking-tight text-[#005461] sm:text-3xl">Welcome back</h1>
                        <p className="text-sm text-[#005461]/70 font-normal">Sign in to the oopsy admin console</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-xs font-semibold tracking-wider text-[#005461]/70 uppercase">
                                EMAIL
                            </label>
                            <Input id="email" type="email" placeholder="Enter your email address" {...register("email")} className="h-12 bg-white/80 border-white/60 rounded-xl text-[#005461] placeholder:text-[#005461]/40 focus-visible:ring-[#005461]" />
                            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="text-xs font-semibold tracking-wider text-[#005461]/70 uppercase">
                                PASSWORD
                            </label>
                            <div className="relative">
                                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" {...register("password")} className="h-12 pr-10 bg-white/80 border-white/60 rounded-xl text-[#005461] placeholder:text-[#005461]/40 focus-visible:ring-[#005461]" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#005461]/50 hover:text-[#005461] transition-colors">
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2.5 text-sm text-[#005461]/70 cursor-pointer select-none group">
                                <div className="relative flex items-center justify-center">
                                    <input type="checkbox" {...register("rememberMe")} className="peer sr-only" />
                                    <div className="h-5 w-5 rounded-md border-2 border-[#005461]/30 bg-white/80 transition-all peer-checked:bg-[#005461] peer-checked:border-[#005461] peer-focus-visible:ring-2 peer-focus-visible:ring-[#005461] group-hover:border-[#005461]" />
                                    <Check className="absolute h-3.5 w-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity stroke-3" />
                                </div>
                                <span>Remember me</span>
                            </label>
                            <Link href="/auth/forgot-password" className="text-sm font-semibold text-[#005461] hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-base font-semibold bg-[#005461] hover:bg-[#00424d] text-white rounded-xl shadow-none">
                            Sign in
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-[#005461]/15" />
                        </div>
                        <span className="relative bg-[#E2EFF1] px-3 text-xs text-[#005461]/50 uppercase">or</span>
                    </div>

                    {/* Create Account Link */}
                    <div className="text-center text-sm">
                        <Link href="/auth/register" className="font-semibold text-[#005461] hover:underline">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
