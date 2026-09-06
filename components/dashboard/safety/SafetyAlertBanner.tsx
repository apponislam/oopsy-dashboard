"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface SafetyAlertBannerProps {
    activeCount: number;
    highlightText: string;
}

export function SafetyAlertBanner({ activeCount, highlightText }: SafetyAlertBannerProps) {
    return (
        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 text-amber-900 shadow-sm">
            <div className="p-2 bg-amber-100/80 text-amber-600 rounded-lg shrink-0 mt-0.5">
                <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-base text-amber-900">
                    {activeCount} Active Safety Incidents
                </h3>
                <p className="text-sm text-amber-800/90 mt-0.5 font-medium">
                    {highlightText}
                </p>
            </div>
        </div>
    );
}
