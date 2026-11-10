"use client";

import React from "react";
import { Bell } from "lucide-react";

interface NotificationsHeaderProps {
    unreadCount?: number;
}

export function NotificationsHeader({ unreadCount = 0 }: NotificationsHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-100 gap-3">
            <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#088395]">
                    <Bell className="h-4 w-4" />
                    <span>Platform</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">Notification Management</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    Send platform-wide broadcasts and manage user notifications
                </p>
            </div>

            {unreadCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200/60 text-[#005461] text-xs font-bold self-start sm:self-center">
                    <span className="h-2 w-2 rounded-full bg-[#005461] animate-pulse" />
                    <span>{unreadCount} Unread Notifications</span>
                </div>
            )}
        </div>
    );
}
