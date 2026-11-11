"use client";

import React from "react";
import { Star, ShieldAlert } from "lucide-react";

interface ReviewsHeaderProps {
    flaggedCount?: number;
}

export function ReviewsHeader({ flaggedCount = 0 }: ReviewsHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-100 gap-3">
            <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#088395]">
                    <Star className="h-4 w-4" />
                    <span>Moderation</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">Reviews Moderation</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    Monitor, moderate, approve, or remove user-submitted reviews & ratings
                </p>
            </div>

            {flaggedCount > 0 && (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold self-start sm:self-center">
                    <ShieldAlert className="h-4 w-4 text-amber-600 animate-pulse" />
                    <span>{flaggedCount} Review{flaggedCount > 1 ? "s" : ""} Require Attention</span>
                </div>
            )}
        </div>
    );
}
