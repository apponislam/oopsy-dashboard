"use client";

import React from "react";
import { SystemSettings } from "./types";
import { Sliders, Bell } from "lucide-react";

interface LeftSettingsCardsProps {
    settings: SystemSettings;
    onToggle: (key: keyof SystemSettings) => void;
}

export function LeftSettingsCards({ settings, onToggle }: LeftSettingsCardsProps) {
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
        {
            key: "showPublicFacilities" as const,
            title: "Show Public Facilities",
            description: "Free facilities appear on map and discovery",
        },
    ];

    const notificationControls = [
        {
            key: "emailNotifications" as const,
            title: "Email Notifications",
            description: "Send transactional emails to users",
        },
        {
            key: "smsNotifications" as const,
            title: "SMS Notifications",
            description: "Send SMS alerts (carrier charges apply)",
        },
    ];

    return (
        <div className="space-y-6">
            {/* 1st card: Platform Controls */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-xs">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#f0f9fa] text-[#088395]">
                        <Sliders className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Platform Controls</h2>
                        <p className="text-xs text-gray-500">Global switches affecting all users</p>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {platformControls.map((item) => {
                        const checked = settings[item.key] as boolean;
                        return (
                            <div key={item.key} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-sm text-gray-900">{item.title}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                                </div>

                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={checked}
                                    onClick={() => onToggle(item.key)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                        checked ? "bg-[#005461]" : "bg-gray-200"
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                            checked ? "translate-x-5" : "translate-x-0"
                                        }`}
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 2nd card: Notifications */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-xs">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#f0f9fa] text-[#088395]">
                        <Bell className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                        <p className="text-xs text-gray-500">User communication channels</p>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {notificationControls.map((item) => {
                        const checked = settings[item.key] as boolean;
                        return (
                            <div key={item.key} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-sm text-gray-900">{item.title}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                                </div>

                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={checked}
                                    onClick={() => onToggle(item.key)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                        checked ? "bg-[#088395]" : "bg-gray-200"
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                            checked ? "translate-x-5" : "translate-x-0"
                                        }`}
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
