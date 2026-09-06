"use client";

import React, { useState } from "react";
import { SystemSettings } from "./types";
import { SettingsHeader } from "./SettingsHeader";
import { LeftSettingsCards } from "./LeftSettingsCards";
import { RightSettingsCards } from "./RightSettingsCards";

const initialSettings: SystemSettings = {
    maintenanceMode: false,
    allowNewRegistrations: true,
    autoApproveReviews: false,
    showPublicFacilities: true,
    emailNotifications: true,
    smsNotifications: false,
    supportEmail: "support@oopsy.app",
    defaultCommission: 10,
    maxAdvanceBookingDays: 30,
};

export function SettingsManagement() {
    const [settings, setSettings] = useState<SystemSettings>(initialSettings);

    const handleToggle = (key: keyof SystemSettings) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleUpdateField = (key: keyof SystemSettings, value: any) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSaveChanges = () => {
        alert("System settings saved successfully!");
    };

    const handleClearCache = () => {
        alert("Platform cache cleared!");
    };

    const handleResetAnalytics = () => {
        if (confirm("Are you sure you want to reset platform analytics?")) {
            alert("Analytics data reset!");
        }
    };

    const handleDatabaseBackup = () => {
        alert("Initiated database backup... Download link will be sent shortly.");
    };

    const handleToggleMaintenance = () => {
        setSettings((prev) => ({
            ...prev,
            maintenanceMode: !prev.maintenanceMode,
        }));
        alert(`Maintenance Mode is now ${!settings.maintenanceMode ? "ENABLED" : "DISABLED"}.`);
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            <SettingsHeader onSaveChanges={handleSaveChanges} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="lg:col-span-1">
                    <LeftSettingsCards
                        settings={settings}
                        onToggle={handleToggle}
                    />
                </div>
                <div className="lg:col-span-1">
                    <RightSettingsCards
                        settings={settings}
                        onUpdateField={handleUpdateField}
                        onClearCache={handleClearCache}
                        onResetAnalytics={handleResetAnalytics}
                        onDatabaseBackup={handleDatabaseBackup}
                        onToggleMaintenance={handleToggleMaintenance}
                    />
                </div>
            </div>
        </div>
    );
}
