"use client";

import React from "react";
import { Sliders, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsHeaderProps {
    activeTab: "system" | "profile";
    onTabChange: (tab: "system" | "profile") => void;
}

export function SettingsHeader({
    activeTab,
    onTabChange,
}: SettingsHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[#005461]/10">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#005461]/60">
                    <Sliders className="h-3.5 w-3.5 text-[#005461]" />
                    <span>Platform</span>
                </div>
                <h1 className="text-2xl font-extrabold text-[#005461] tracking-tight">
                    System Settings
                </h1>
                <p className="text-xs text-[#005461]/70 font-medium">
                    Configure platform-wide settings
                </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-[#f0f9fa] border border-[#005461]/10">
                <button
                    type="button"
                    onClick={() => onTabChange("system")}
                    className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                        activeTab === "system"
                            ? "bg-[#005461] text-white shadow-2xs"
                            : "text-[#005461]/70 hover:text-[#005461]"
                    )}
                >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>System Settings</span>
                </button>

                <button
                    type="button"
                    onClick={() => onTabChange("profile")}
                    className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                        activeTab === "profile"
                            ? "bg-[#005461] text-white shadow-2xs"
                            : "text-[#005461]/70 hover:text-[#005461]"
                    )}
                >
                    <User className="w-3.5 h-3.5" />
                    <span>Admin Profile</span>
                </button>
            </div>
        </div>
    );
}
