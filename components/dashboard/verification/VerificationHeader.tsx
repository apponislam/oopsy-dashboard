"use client";

import { ShieldCheck } from "lucide-react";

export function VerificationHeader() {
    return (
        <div className="space-y-1">
            <span className="text-[11px] text-[#005461]/60 font-semibold uppercase tracking-wider">
                People
            </span>
            <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-extrabold text-[#005461] tracking-tight">
                    Provider Verification
                </h1>
            </div>
            <p className="text-xs text-[#005461]/70 font-medium">
                Review and approve provider applications
            </p>
        </div>
    );
}
