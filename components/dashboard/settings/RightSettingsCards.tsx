"use client";

import React from "react";
import { SystemSettings } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings2, AlertTriangle, RefreshCw, RotateCcw, Database } from "lucide-react";

interface RightSettingsCardsProps {
    settings: SystemSettings;
    onUpdateField: (key: keyof SystemSettings, value: any) => void;
    onClearCache: () => void;
    onResetAnalytics: () => void;
    onDatabaseBackup: () => void;
    onToggleMaintenance: () => void;
}

export function RightSettingsCards({
    settings,
    onUpdateField,
    onClearCache,
    onResetAnalytics,
    onDatabaseBackup,
    onToggleMaintenance,
}: RightSettingsCardsProps) {
    return (
        <div className="space-y-6">
            {/* 1st card: Configuration */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-xs">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#f0f9fa] text-[#088395]">
                        <Settings2 className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Configuration</h2>
                        <p className="text-xs text-gray-500">Platform operational parameters</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            Support Email
                        </label>
                        <Input
                            type="email"
                            placeholder="support@oopsy.app"
                            value={settings.supportEmail}
                            onChange={(e) => onUpdateField("supportEmail", e.target.value)}
                            className="rounded-xl border-gray-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            Default Commission %
                        </label>
                        <Input
                            type="number"
                            placeholder="10"
                            value={settings.defaultCommission}
                            onChange={(e) => onUpdateField("defaultCommission", Number(e.target.value))}
                            className="rounded-xl border-gray-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            Max Advance Booking (days)
                        </label>
                        <Input
                            type="number"
                            placeholder="30"
                            value={settings.maxAdvanceBookingDays}
                            onChange={(e) => onUpdateField("maxAdvanceBookingDays", Number(e.target.value))}
                            className="rounded-xl border-gray-200"
                        />
                    </div>
                </div>
            </div>

            {/* 2nd card: Danger Zone */}
            <div className="bg-white rounded-2xl border border-red-100/80 p-6 space-y-5 shadow-xs">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-red-50 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-red-900">Danger Zone</h2>
                        <p className="text-xs text-red-600/80">Critical system reset & maintenance tools</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClearCache}
                        className="w-full justify-start text-xs font-medium border-gray-200 hover:bg-gray-50 rounded-xl gap-2 h-10"
                    >
                        <RefreshCw className="h-3.5 w-3.5 text-gray-500" />
                        Clear Cache
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={onResetAnalytics}
                        className="w-full justify-start text-xs font-medium border-gray-200 hover:bg-gray-50 rounded-xl gap-2 h-10"
                    >
                        <RotateCcw className="h-3.5 w-3.5 text-gray-500" />
                        Reset Analytics
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={onDatabaseBackup}
                        className="w-full justify-start text-xs font-medium border-gray-200 hover:bg-gray-50 rounded-xl gap-2 h-10"
                    >
                        <Database className="h-3.5 w-3.5 text-gray-500" />
                        Database Backup
                    </Button>

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onToggleMaintenance}
                        className="w-full justify-start text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl gap-2 h-10"
                    >
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {settings.maintenanceMode ? "Disable Maintenance Mode" : "⚠️ Enable Maintenance Mode"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
