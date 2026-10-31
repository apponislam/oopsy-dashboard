"use client";

import React from "react";
import { TSystemSettings } from "@/redux/features/settings/settingsApi";
import { Sliders, Bell, Loader2 } from "lucide-react";

interface LeftSettingsCardsProps {
    settings: TSystemSettings;
    onToggle: (key: keyof TSystemSettings) => void;
    updatingKey?: string | null;
}

export function LeftSettingsCards({
    settings,
    onToggle,
    updatingKey,
}: LeftSettingsCardsProps) {
    const platformControls = [
        {
            key: "maintenanceMode" as const,
            title: "Maintenance Mode",
            description: "Puts platform in read-only mode for all users",
        },
        {
            key: "allowNewRegistrations" as const,
            title: "Allow New Registrations",
            description: "New users can sign up to the platform",
        },
        {
            key: "autoApproveReviews" as const,
            title: "Auto-Approve Reviews",
            description: "Reviews go live without moderation",
        },
    ];

    const notificationControls = [
        {
            key: "emailNotifications" as const,
            title: "Email Notifications",
            description: "Send transactional emails to users",
        },
        {
            key: "pushNotifications" as const,
            title: "Push Notifications",
            description: "Send push alerts to user and provider devices",
        },
    ];

    return (
        <div className="space-y-6">
            {/* 1st card: Platform Controls */}
            <div className="bg-white rounded-2xl border border-[#005461]/10 p-6 space-y-5 shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">
                        <Sliders className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-extrabold text-[#005461]">Platform Controls</h2>
                        <p className="text-xs text-[#005461]/60 font-medium">
                            Global switches affecting all users
                        </p>
                    </div>
                </div>

                <div className="divide-y divide-[#005461]/5">
                    {platformControls.map((item) => {
                        const checked = settings[item.key] as boolean;
                        const isCurrentUpdating = updatingKey === item.key;

                        return (
                            <div
                                key={item.key}
                                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                            >
                                <div className="space-y-0.5">
                                    <h3 className="font-bold text-xs text-[#005461]">{item.title}</h3>
                                    <p className="text-[11px] text-[#005461]/60 leading-normal">
                                        {item.description}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={checked}
                                    disabled={isCurrentUpdating}
                                    onClick={() => onToggle(item.key)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-60 ${
                                        checked ? "bg-[#005461]" : "bg-gray-200"
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-flex items-center justify-center h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                            checked ? "translate-x-5" : "translate-x-0"
                                        }`}
                                    >
                                        {isCurrentUpdating && (
                                            <Loader2 className="w-3 h-3 text-[#005461] animate-spin" />
                                        )}
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 2nd card: Notifications */}
            <div className="bg-white rounded-2xl border border-[#005461]/10 p-6 space-y-5 shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">
                        <Bell className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-extrabold text-[#005461]">Notifications</h2>
                        <p className="text-xs text-[#005461]/60 font-medium">
                            User communication channels
                        </p>
                    </div>
                </div>

                <div className="divide-y divide-[#005461]/5">
                    {notificationControls.map((item) => {
                        const checked = settings[item.key] as boolean;
                        const isCurrentUpdating = updatingKey === item.key;

                        return (
                            <div
                                key={item.key}
                                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                            >
                                <div className="space-y-0.5">
                                    <h3 className="font-bold text-xs text-[#005461]">{item.title}</h3>
                                    <p className="text-[11px] text-[#005461]/60 leading-normal">
                                        {item.description}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={checked}
                                    disabled={isCurrentUpdating}
                                    onClick={() => onToggle(item.key)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-60 ${
                                        checked ? "bg-[#005461]" : "bg-gray-200"
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-flex items-center justify-center h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                            checked ? "translate-x-5" : "translate-x-0"
                                        }`}
                                    >
                                        {isCurrentUpdating && (
                                            <Loader2 className="w-3 h-3 text-[#005461] animate-spin" />
                                        )}
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
