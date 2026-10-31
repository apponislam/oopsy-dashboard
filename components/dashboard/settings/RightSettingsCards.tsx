"use client";

import React from "react";
import { TSystemSettings } from "@/redux/features/settings/settingsApi";
import {
    Settings2,
    AlertTriangle,
    RefreshCw,
    RotateCcw,
    Database,
    Mail,
    Percent,
    Calendar,
    Save,
    Check,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RightSettingsCardsProps {
    settings: TSystemSettings;
    onUpdateField: (key: keyof TSystemSettings, value: string | number | boolean) => void;
    onRequestClearCache: () => void;
    onRequestResetAnalytics: () => void;
    onRequestDatabaseBackup: () => void;
    onRequestToggleMaintenance: () => void;
    onSaveConfiguration: () => void;
    isSaving?: boolean;
    isSaved?: boolean;
}

export function RightSettingsCards({
    settings,
    onUpdateField,
    onRequestClearCache,
    onRequestResetAnalytics,
    onRequestDatabaseBackup,
    onRequestToggleMaintenance,
    onSaveConfiguration,
    isSaving = false,
    isSaved = false,
}: RightSettingsCardsProps) {
    return (
        <div className="space-y-6">
            {/* 1st card: Configuration */}
            <div className="bg-white rounded-2xl border border-[#005461]/10 p-6 space-y-5 shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">
                        <Settings2 className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-extrabold text-[#005461]">Configuration</h2>
                        <p className="text-xs text-[#005461]/60 font-medium">
                            Platform operational parameters
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Support Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#005461] uppercase tracking-wider flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#005461]/60" />
                            <span>Support Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="support@oopsy.app"
                            value={settings.supportEmail}
                            onChange={(e) => onUpdateField("supportEmail", e.target.value)}
                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#f0f9fa] border border-[#005461]/15 text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all font-medium"
                        />
                    </div>

                    {/* Default Commission % */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#005461] uppercase tracking-wider flex items-center gap-1.5">
                            <Percent className="w-3.5 h-3.5 text-[#005461]/60" />
                            <span>Default Commission %</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min={0}
                                max={100}
                                placeholder="10"
                                value={settings.defaultCommissionPercentage}
                                onChange={(e) =>
                                    onUpdateField("defaultCommissionPercentage", Number(e.target.value))
                                }
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#f0f9fa] border border-[#005461]/15 text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all font-medium pr-8"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#005461]/50 pointer-events-none">
                                %
                            </span>
                        </div>
                    </div>

                    {/* Max Advance Booking (days) */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#005461] uppercase tracking-wider flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#005461]/60" />
                            <span>Max Advance Booking (days)</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min={1}
                                max={365}
                                placeholder="30"
                                value={settings.maxAdvanceBookingDays}
                                onChange={(e) =>
                                    onUpdateField(
                                        "maxAdvanceBookingDays",
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#f0f9fa] border border-[#005461]/15 text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all font-medium pr-14"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#005461]/50 pointer-events-none">
                                days
                            </span>
                        </div>
                    </div>
                </div>

                {/* Save Configuration Action */}
                <div className="pt-3 border-t border-[#005461]/10 flex items-center justify-end">
                    <button
                        type="button"
                        onClick={onSaveConfiguration}
                        disabled={isSaving}
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs disabled:opacity-60",
                            isSaved
                                ? "bg-emerald-600 text-white"
                                : "bg-[#005461] hover:bg-[#00424d] text-white"
                        )}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : isSaved ? (
                            <>
                                <Check className="h-3.5 w-3.5" />
                                <span>Configuration Saved</span>
                            </>
                        ) : (
                            <>
                                <Save className="h-3.5 w-3.5" />
                                <span>Save Configuration</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* 2nd card: Danger Zone */}
            <div className="bg-white rounded-2xl border border-rose-200 p-6 space-y-5 shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-extrabold text-rose-900">Danger Zone</h2>
                        <p className="text-xs text-rose-700/80 font-medium">
                            Critical system reset &amp; maintenance tools
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    {/* Clear Cache */}
                    <button
                        type="button"
                        onClick={onRequestClearCache}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-[#005461] bg-[#f0f9fa] hover:bg-[#E2EFF1] border border-[#005461]/10 rounded-xl transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <RefreshCw className="h-3.5 w-3.5 text-[#005461]" />
                            <span>Clear Cache</span>
                        </div>
                        <span className="text-[10px] text-[#005461]/50 font-medium">
                            Invalidate platform caches
                        </span>
                    </button>

                    {/* Reset Analytics */}
                    <button
                        type="button"
                        onClick={onRequestResetAnalytics}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-rose-700 bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <RotateCcw className="h-3.5 w-3.5 text-rose-600" />
                            <span>Reset Analytics</span>
                        </div>
                        <span className="text-[10px] text-rose-600/70 font-medium">
                            Purge counters &amp; metrics
                        </span>
                    </button>

                    {/* Database Backup */}
                    <button
                        type="button"
                        onClick={onRequestDatabaseBackup}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-[#005461] bg-[#f0f9fa] hover:bg-[#E2EFF1] border border-[#005461]/10 rounded-xl transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <Database className="h-3.5 w-3.5 text-[#005461]" />
                            <span>Database Backup</span>
                        </div>
                        <span className="text-[10px] text-[#005461]/50 font-medium">
                            Export system snapshot
                        </span>
                    </button>

                    {/* Enable / Disable Maintenance Mode */}
                    <button
                        type="button"
                        onClick={onRequestToggleMaintenance}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs ${
                            settings.maintenanceMode
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                : "bg-rose-600 hover:bg-rose-700 text-white"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            <span>
                                {settings.maintenanceMode
                                    ? "Disable Maintenance Mode"
                                    : "⚠️ Enable Maintenance Mode"}
                            </span>
                        </div>
                        <span className="text-[10px] text-white/80 font-medium">
                            {settings.maintenanceMode ? "Platform in Read-Only" : "Global Read-Only"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
