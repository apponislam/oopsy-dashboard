"use client";

import React from "react";
import { Bell } from "lucide-react";

export function NotificationsHeader() {
    return (
        <div className="pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#088395]">
                <Bell className="h-4 w-4" />
                <span>Platform</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">Notification Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">
                Send platform-wide or targeted notifications
            </p>
        </div>
    );
}
