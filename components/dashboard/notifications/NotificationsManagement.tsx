"use client";

import React, { useState } from "react";
import { SentNotification, AudienceType } from "./types";
import { NotificationsHeader } from "./NotificationsHeader";
import { SendNotificationForm } from "./SendNotificationForm";
import { SentHistory } from "./SentHistory";

const initialHistory: SentNotification[] = [
    {
        id: "notif-1",
        title: "New feature: Spa listings added",
        audience: "All",
        date: "20 Aug 2026",
        recipientsCount: 24891,
        openRate: "68%",
    },
    {
        id: "notif-2",
        title: "Scheduled maintenance 2am–4am",
        audience: "All",
        date: "18 Aug 2026",
        recipientsCount: 24891,
        openRate: "42%",
    },
    {
        id: "notif-3",
        title: "Verification reminder — urgent",
        audience: "Providers",
        date: "15 Aug 2026",
        recipientsCount: 1284,
        openRate: "81%",
    },
];

export function NotificationsManagement() {
    const [history, setHistory] = useState<SentNotification[]>(initialHistory);

    const handleSendNotification = (title: string, message: string, audience: AudienceType) => {
        const recipientsCount =
            audience === "All"
                ? 24891
                : audience === "Clients"
                ? 23607
                : 1284;

        const newSent: SentNotification = {
            id: `notif-${Date.now()}`,
            title,
            audience,
            date: "Today",
            recipientsCount,
            openRate: "0%",
        };

        setHistory((prev) => [newSent, ...prev]);
        alert(`Notification "${title}" sent to ${audience}!`);
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            <NotificationsHeader />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="lg:col-span-1">
                    <SendNotificationForm onSendNotification={handleSendNotification} />
                </div>
                <div className="lg:col-span-1">
                    <SentHistory history={history} />
                </div>
            </div>
        </div>
    );
}
