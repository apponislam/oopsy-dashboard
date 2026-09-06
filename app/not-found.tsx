"use client";

import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-[#f0f9fa] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#005461]/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#088395]/10 blur-3xl pointer-events-none" />

            {/* Centered Content (No Box Card) */}
            <div className="max-w-lg w-full text-center relative z-10 space-y-6">
                {/* Large 404 Graphic Number */}
                <div className="relative inline-block">
                    <span className="text-8xl md:text-9xl font-black tracking-tighter text-[#005461]/15 select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-2xl bg-[#005461] text-white flex items-center justify-center shadow-lg">
                            <Compass className="w-8 h-8 animate-spin-slow" />
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase bg-[#088395]/15 text-[#005461] border border-[#088395]/20">
                        Page Not Found
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-[#005461] tracking-tight">
                        Looking for something?
                    </h1>
                    <p className="text-xs md:text-sm text-[#005461]/70 font-medium max-w-sm mx-auto leading-relaxed">
                        The page you are trying to access doesn’t exist or might have been relocated.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#005461]/20 hover:bg-[#E2EFF1] text-[#005461] text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>

                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-bold transition-all shadow-2xs active:scale-[0.98]"
                    >
                        <Home className="w-4 h-4" />
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
