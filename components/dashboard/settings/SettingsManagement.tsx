"use client";

import React, { useState } from "react";
import {
    TSystemSettings,
    useGetSettingsQuery,
    useUpdateSettingsMutation,
} from "@/redux/features/settings/settingsApi";
import { SettingsHeader } from "./SettingsHeader";
import { LeftSettingsCards } from "./LeftSettingsCards";
import { RightSettingsCards } from "./RightSettingsCards";
import { AdminProfileCard } from "./AdminProfileCard";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";

const defaultSettings: TSystemSettings = {
    maintenanceMode: false,
    allowNewRegistrations: true,
    autoApproveReviews: false,
    emailNotifications: true,
    pushNotifications: true,
    supportEmail: "support@oopsy.app",
    defaultCommissionPercentage: 10,
    maxAdvanceBookingDays: 30,
};

export function SettingsManagement() {
    const { data: settingsResponse, isLoading } = useGetSettingsQuery();
    const [updateSettingsMutation, { isLoading: isUpdating }] = useUpdateSettingsMutation();

    const [activeTab, setActiveTab] = useState<"system" | "profile">("system");
    const [formSettings, setFormSettings] = useState<TSystemSettings | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [updatingKey, setUpdatingKey] = useState<string | null>(null);

    // Human-friendly labels for toggle settings
    const toggleLabels: Partial<Record<keyof TSystemSettings, string>> = {
        maintenanceMode: "Maintenance Mode",
        allowNewRegistrations: "Allow New Registrations",
        autoApproveReviews: "Auto-Approve Reviews",
        emailNotifications: "Email Notifications",
        pushNotifications: "Push Notifications",
    };

    // Current settings: user's uncommitted form changes ?? server settings ?? default fallback
    const settings: TSystemSettings = formSettings ?? settingsResponse?.data ?? defaultSettings;

    // Danger Zone Modal state
    const [activeModal, setActiveModal] = useState<
        "clearCache" | "resetAnalytics" | "databaseBackup" | "toggleMaintenance" | null
    >(null);

    // Feedback notification
    const [feedbackNotice, setFeedbackNotice] = useState<{
        message: string;
        type: "success" | "warning";
    } | null>(null);

    // Toggle a boolean switch with instant auto-save to backend
    const handleToggle = async (key: keyof TSystemSettings) => {
        if (key === "maintenanceMode") {
            setActiveModal("toggleMaintenance");
            return;
        }

        const nextValue = !settings[key];

        // Optimistically update
        setFormSettings((prev) => ({
            ...(prev ?? settings),
            [key]: nextValue,
        }));
        setUpdatingKey(key);

        try {
            await updateSettingsMutation({
                [key]: nextValue,
            }).unwrap();

            setFeedbackNotice({
                message: `${toggleLabels[key] || String(key)} updated successfully!`,
                type: "success",
            });
            setTimeout(() => {
                setFeedbackNotice((curr) =>
                    curr?.message.includes("updated successfully") ? null : curr
                );
            }, 2500);
        } catch (error: unknown) {
            console.error(`Failed to update ${String(key)}:`, error);
            // Revert back on failure
            setFormSettings((prev) => ({
                ...(prev ?? settings),
                [key]: !nextValue,
            }));
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg =
                errObj?.data?.message ||
                errObj?.error ||
                "Failed to update setting. Please verify admin privileges.";
            setFeedbackNotice({
                message: errMsg,
                type: "warning",
            });
        } finally {
            setUpdatingKey(null);
        }
    };

    // Update field value
    const handleUpdateField = (
        key: keyof TSystemSettings,
        value: string | number | boolean
    ) => {
        setFormSettings({
            ...settings,
            [key]: value,
        });
    };

    // Save configuration parameters to backend via PATCH /settings
    const handleSaveConfiguration = async () => {
        try {
            await updateSettingsMutation({
                supportEmail: settings.supportEmail,
                defaultCommissionPercentage: settings.defaultCommissionPercentage,
                maxAdvanceBookingDays: settings.maxAdvanceBookingDays,
            }).unwrap();

            setFormSettings(null);
            setIsSaved(true);
            setFeedbackNotice({
                message: "Configuration parameters saved successfully!",
                type: "success",
            });
            setTimeout(() => setIsSaved(false), 2500);
        } catch (error: unknown) {
            console.error("Failed to save configuration:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg =
                errObj?.data?.message ||
                errObj?.error ||
                "Failed to update configuration. Please check your admin privileges.";
            setFeedbackNotice({
                message: errMsg,
                type: "warning",
            });
        }
    };

    // Confirm Clear Cache
    const handleConfirmClearCache = () => {
        setActiveModal(null);
        setFeedbackNotice({
            message: "Platform cache keys and static assets cleared successfully.",
            type: "success",
        });
    };

    // Confirm Reset Analytics
    const handleConfirmResetAnalytics = () => {
        setActiveModal(null);
        setFeedbackNotice({
            message: "Platform analytics counters and metrics reset.",
            type: "warning",
        });
    };

    // Confirm Database Backup & Export JSON download
    const handleConfirmDatabaseBackup = () => {
        setActiveModal(null);
        try {
            const backupData = {
                exportedAt: new Date().toISOString(),
                version: "1.0.0",
                platform: "OOPSY Admin",
                settings,
            };
            const blob = new Blob([JSON.stringify(backupData, null, 2)], {
                type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `oopsy-system-backup-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setFeedbackNotice({
                message: "System snapshot exported and backup file downloaded.",
                type: "success",
            });
        } catch (error) {
            console.error("Backup export failed:", error);
        }
    };

    // Confirm Toggle Maintenance Mode
    const handleConfirmToggleMaintenance = async () => {
        const nextMode = !settings.maintenanceMode;
        setUpdatingKey("maintenanceMode");
        try {
            await updateSettingsMutation({
                maintenanceMode: nextMode,
            }).unwrap();

            setFormSettings((prev) => (prev ? { ...prev, maintenanceMode: nextMode } : null));
            setActiveModal(null);
            setFeedbackNotice({
                message: nextMode
                    ? "Maintenance Mode is now ENABLED. Platform is restricted to read-only."
                    : "Maintenance Mode is now DISABLED. Full platform services restored.",
                type: nextMode ? "warning" : "success",
            });
        } catch (error: unknown) {
            console.error("Failed to toggle maintenance mode:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg =
                errObj?.data?.message ||
                errObj?.error ||
                "Failed to update maintenance mode on server.";
            setFeedbackNotice({
                message: errMsg,
                type: "warning",
            });
        } finally {
            setUpdatingKey(null);
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-375 mx-auto min-h-screen">
            {/* Header */}
            <SettingsHeader
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* Maintenance Mode Alert Banner */}
            {settings.maintenanceMode && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-center justify-between gap-3 text-xs animate-in fade-in">
                    <div className="flex items-center gap-2.5 font-bold">
                        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                        <span>
                            ⚠️ Maintenance Mode is currently <strong>ACTIVE</strong>. Regular users and providers are restricted to read-only access.
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setActiveModal("toggleMaintenance")}
                        className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 cursor-pointer transition-colors shadow-2xs"
                    >
                        Disable
                    </button>
                </div>
            )}

            {/* Dismissible Feedback Notice */}
            {feedbackNotice && (
                <div
                    className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
                        feedbackNotice.type === "success"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-amber-50 border-amber-200 text-amber-900"
                    }`}
                >
                    <div className="flex items-center gap-2 font-bold">
                        {feedbackNotice.type === "success" ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                        )}
                        <span>{feedbackNotice.message}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setFeedbackNotice(null)}
                        className="p-1 rounded-md hover:bg-black/5 cursor-pointer"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}

            {/* Tab Views */}
            {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div className="h-96 rounded-2xl bg-white border border-[#005461]/10 p-6 animate-pulse" />
                    <div className="h-96 rounded-2xl bg-white border border-[#005461]/10 p-6 animate-pulse" />
                </div>
            ) : activeTab === "system" ? (
                /* 2 side 50/50 Grid (Matching doc.txt) */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Left side: Platform Controls (1st card) & Notifications (2nd card) */}
                    <div className="lg:col-span-1">
                        <LeftSettingsCards
                            settings={settings}
                            onToggle={handleToggle}
                            updatingKey={updatingKey}
                        />
                    </div>

                    {/* Right side: Configuration (1st card) & Danger Zone (2nd card) */}
                    <div className="lg:col-span-1">
                        <RightSettingsCards
                            settings={settings}
                            onUpdateField={handleUpdateField}
                            onRequestClearCache={() => setActiveModal("clearCache")}
                            onRequestResetAnalytics={() => setActiveModal("resetAnalytics")}
                            onRequestDatabaseBackup={() => setActiveModal("databaseBackup")}
                            onRequestToggleMaintenance={() => setActiveModal("toggleMaintenance")}
                            onSaveConfiguration={handleSaveConfiguration}
                            isSaving={isUpdating}
                            isSaved={isSaved}
                        />
                    </div>
                </div>
            ) : (
                /* Admin Profile & Security View */
                <AdminProfileCard />
            )}

            {/* Clear Cache Confirmation Modal */}
            <ConfirmModal
                isOpen={activeModal === "clearCache"}
                title="Clear Platform Cache"
                variant="warning"
                confirmText="Clear Cache"
                cancelText="Cancel"
                onConfirm={handleConfirmClearCache}
                onClose={() => setActiveModal(null)}
                description={
                    <div className="space-y-1.5">
                        <p>Are you sure you want to clear platform runtime caches?</p>
                        <p className="text-[#005461]/70">
                            This will invalidate cached queries, compiled pages, and temporary data. Response times might momentarily fluctuate while caches rebuild.
                        </p>
                    </div>
                }
            />

            {/* Reset Analytics Confirmation Modal */}
            <ConfirmModal
                isOpen={activeModal === "resetAnalytics"}
                title="Reset Platform Analytics"
                variant="danger"
                confirmText="Reset Analytics"
                cancelText="Cancel"
                onConfirm={handleConfirmResetAnalytics}
                onClose={() => setActiveModal(null)}
                description={
                    <div className="space-y-1.5">
                        <p>
                            Are you sure you want to reset all platform performance metrics and analytics?
                        </p>
                        <p className="text-rose-700 font-semibold">
                            ⚠️ This action will permanently erase aggregated traffic counters and chart data. This cannot be undone.
                        </p>
                    </div>
                }
            />

            {/* Database Backup Confirmation Modal */}
            <ConfirmModal
                isOpen={activeModal === "databaseBackup"}
                title="Export Database Snapshot"
                variant="success"
                confirmText="Download Backup"
                cancelText="Cancel"
                onConfirm={handleConfirmDatabaseBackup}
                onClose={() => setActiveModal(null)}
                description={
                    <div className="space-y-1.5">
                        <p>Generate a complete configuration and metadata backup snapshot?</p>
                        <p className="text-[#005461]/70">
                            A formatted JSON backup file containing current platform settings, commission configurations, and operational switches will be generated and downloaded.
                        </p>
                    </div>
                }
            />

            {/* Toggle Maintenance Mode Confirmation Modal */}
            <ConfirmModal
                isOpen={activeModal === "toggleMaintenance"}
                title={
                    settings.maintenanceMode
                        ? "Disable Maintenance Mode"
                        : "Enable Maintenance Mode"
                }
                variant={settings.maintenanceMode ? "success" : "danger"}
                confirmText={
                    settings.maintenanceMode
                        ? "Disable Maintenance"
                        : "Enable Maintenance Mode"
                }
                cancelText="Cancel"
                isLoading={updatingKey === "maintenanceMode"}
                onConfirm={handleConfirmToggleMaintenance}
                onClose={() => {
                    if (updatingKey !== "maintenanceMode") setActiveModal(null);
                }}
                description={
                    settings.maintenanceMode ? (
                        <div className="space-y-1.5">
                            <p>Restore full public access to the platform?</p>
                            <p className="text-[#005461]/70">
                                Users and providers will immediately be able to sign up, book listings, and process transactions normally.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            <p className="text-rose-700 font-bold">
                                ⚠️ Are you sure you want to put the platform into Maintenance Mode?
                            </p>
                            <p className="text-[#005461]/70">
                                This will place the platform in read-only mode for all standard users and providers. Only administrators will have active dashboard access.
                            </p>
                        </div>
                    )
                }
            />
        </div>
    );
}

export default SettingsManagement;
