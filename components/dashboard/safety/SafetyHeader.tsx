"use client";

import React from "react";
import { ShieldAlert, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SafetyHeaderProps {
    onDownloadReport: () => void;
}

export function SafetyHeader({ onDownloadReport }: SafetyHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-100">
            <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#088395]">
                    <ShieldAlert className="h-4 w-4" />
                    <span>Moderation</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">Safety Incidents</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    Track and resolve all safety incidents
                </p>
            </div>
            <div>
                <Button
                    onClick={onDownloadReport}
                    className="bg-[#005461] hover:bg-[#00424d] text-white gap-2 font-medium shadow-sm transition-all duration-200"
                >
                    <Download className="h-4 w-4" />
                    Download Report
                </Button>
            </div>
        </div>
    );
}
