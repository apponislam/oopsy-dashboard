"use client";

import React, { useState } from "react";
import { AudienceType, SentNotification, TargetAudience } from "./types";
import { NotificationsHeader } from "./NotificationsHeader";
import { SendNotificationForm } from "./SendNotificationForm";
import { NotificationsFeed } from "./NotificationsFeed";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import {
    useGetUserNotificationsQuery,
    useSendAdminBroadcastMutation,
    useMarkAsReadMutation,
    useMarkAllAsReadMutation,
    useDeleteNotificationMutation,
    useClearAllNotificationsMutation,
} from "@/redux/features/notification/notificationApi";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

export function NotificationsManagement() {
    const [page, setPage] = useState(1);
    const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);
    const [sentHistory, setSentHistory] = useState<SentNotification[]>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("oopsy_sent_broadcasts");
                return saved ? JSON.parse(saved) : [];
            } catch {
                return [];
            }
        }
        return [];
    });

    // Confirmation modal state
    const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

    // Feedback notification toast
    const [feedbackNotice, setFeedbackNotice] = useState<{
        message: string;
        type: "success" | "warning";
    } | null>(null);

    const showFeedback = (message: string, type: "success" | "warning" = "success") => {
        setFeedbackNotice({ message, type });
        setTimeout(() => {
            setFeedbackNotice((curr) => (curr?.message === message ? null : curr));
        }, 3500);
    };

    // RTK Query Hooks
    const { data: response, isLoading } = useGetUserNotificationsQuery({
        page,
        limit: 8,
        isRead: filterUnreadOnly ? false : undefined,
    });

    const [sendBroadcastMutation, { isLoading: isSendingBroadcast }] = useSendAdminBroadcastMutation();
    const [markAsReadMutation] = useMarkAsReadMutation();
    const [markAllAsReadMutation, { isLoading: isMarkingAllRead }] = useMarkAllAsReadMutation();
    const [deleteNotificationMutation] = useDeleteNotificationMutation();
    const [clearAllNotificationsMutation, { isLoading: isClearingAll }] = useClearAllNotificationsMutation();

    const notifications = response?.data || [];
    const meta = response?.meta;
    const unreadCount = response?.stats?.unreadCount || 0;

    // Send Broadcast Handler
    const handleSendNotification = async (
        title: string,
        message: string,
        audience: AudienceType,
        type: string
    ): Promise<boolean> => {
        let target: TargetAudience = "ALL";
        if (audience === "Clients") target = "CLIENT";
        if (audience === "Providers") target = "PROVIDER";

        try {
            const res = await sendBroadcastMutation({
                target,
                title,
                message,
                type,
            }).unwrap();

            const count = res.data?.recipientCount ?? 0;
            const successMsg = res.data?.message || `Broadcast sent to ${count} recipient(s)!`;
            showFeedback(successMsg, "success");

            const newSent: SentNotification = {
                id: `broadcast-${Date.now()}`,
                title,
                message,
                audience,
                date: "Today",
                recipientsCount: count,
                type,
            };

            setSentHistory((prev) => {
                const updated = [newSent, ...prev];
                try {
                    localStorage.setItem("oopsy_sent_broadcasts", JSON.stringify(updated));
                } catch {
                    // Ignore storage errors
                }
                return updated;
            });
            return true;
        } catch (error: unknown) {
            console.error("Failed to send broadcast:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg = errObj?.data?.message || errObj?.error || "Failed to broadcast notification.";
            showFeedback(errMsg, "warning");
            return false;
        }
    };

    // Mark as read
    const handleMarkAsRead = async (id: string) => {
        try {
            await markAsReadMutation(id).unwrap();
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    // Mark all as read
    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsReadMutation().unwrap();
            showFeedback("All notifications marked as read", "success");
        } catch (error) {
            console.error("Failed to mark all as read:", error);
            showFeedback("Failed to mark notifications as read", "warning");
        }
    };

    // Delete single
    const handleDeleteNotification = async (id: string) => {
        try {
            await deleteNotificationMutation(id).unwrap();
            showFeedback("Notification deleted", "success");
        } catch (error) {
            console.error("Failed to delete notification:", error);
            showFeedback("Failed to delete notification", "warning");
        }
    };

    // Clear all
    const handleConfirmClearAll = async () => {
        try {
            await clearAllNotificationsMutation().unwrap();
            setIsClearAllModalOpen(false);
            showFeedback("All notifications cleared successfully", "success");
        } catch (error) {
            console.error("Failed to clear notifications:", error);
            showFeedback("Failed to clear notifications", "warning");
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Feedback notification toast */}
            {feedbackNotice && (
                <div
                    className={`fixed bottom-6 right-6 z-60 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200 ${
                        feedbackNotice.type === "success"
                            ? "bg-emerald-600 text-white"
                            : "bg-amber-600 text-white"
                    }`}
                >
                    {feedbackNotice.type === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                    )}
                    <span>{feedbackNotice.message}</span>
                    <button
                        onClick={() => setFeedbackNotice(null)}
                        className="p-1 hover:bg-black/10 rounded-lg ml-1 cursor-pointer"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}

            <NotificationsHeader unreadCount={unreadCount} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Left Side: Broadcast Form */}
                <div className="lg:col-span-1">
                    <SendNotificationForm
                        onSendNotification={handleSendNotification}
                        isSending={isSendingBroadcast}
                    />
                </div>

                {/* Right Side: Inbox & Sent Feed */}
                <div className="lg:col-span-1">
                    <NotificationsFeed
                        notifications={notifications}
                        isLoading={isLoading}
                        unreadCount={unreadCount}
                        meta={meta}
                        onPageChange={setPage}
                        filterUnreadOnly={filterUnreadOnly}
                        onToggleFilterUnread={(val) => {
                            setFilterUnreadOnly(val);
                            setPage(1);
                        }}
                        onMarkAsRead={handleMarkAsRead}
                        onMarkAllAsRead={handleMarkAllAsRead}
                        onDeleteNotification={handleDeleteNotification}
                        onClearAll={() => setIsClearAllModalOpen(true)}
                        isClearingAll={isClearingAll}
                        isMarkingAllRead={isMarkingAllRead}
                        sentHistory={sentHistory}
                    />
                </div>
            </div>

            {/* Clear All Confirmation Modal */}
            <ConfirmModal
                isOpen={isClearAllModalOpen}
                title="Clear All Notifications"
                description="Are you sure you want to clear all notifications from your inbox? This action cannot be undone."
                confirmText="Clear All"
                variant="danger"
                isLoading={isClearingAll}
                onConfirm={handleConfirmClearAll}
                onClose={() => setIsClearAllModalOpen(false)}
            />
        </div>
    );
}
