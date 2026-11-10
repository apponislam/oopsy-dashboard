"use client";

import React, { useState } from "react";
import { INotification, SentNotification } from "./types";
import { Button } from "@/components/ui/button";
import { Inbox, History, Check, CheckCheck, Trash2, Bell, AlertTriangle, Calendar, Star, MessageSquare, ChevronLeft, ChevronRight, Users, ShieldCheck, User, Loader2 } from "lucide-react";

interface NotificationsFeedProps {
    notifications: INotification[];
    isLoading: boolean;
    unreadCount: number;
    meta?: {
        page: number;
        totalPages: number;
        total: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    onPageChange: (page: number) => void;
    filterUnreadOnly: boolean;
    onToggleFilterUnread: (unreadOnly: boolean) => void;
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
    onDeleteNotification: (id: string) => void;
    onClearAll: () => void;
    isClearingAll: boolean;
    isMarkingAllRead: boolean;
    sentHistory: SentNotification[];
}

export function NotificationsFeed({ notifications, isLoading, unreadCount, meta, onPageChange, filterUnreadOnly, onToggleFilterUnread, onMarkAsRead, onMarkAllAsRead, onDeleteNotification, onClearAll, isClearingAll, isMarkingAllRead, sentHistory }: NotificationsFeedProps) {
    const [activeTab, setActiveTab] = useState<"sent" | "inbox">("sent");

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "BOOKING_CREATED":
            case "BOOKING_STATUS_CHANGED":
                return <Calendar className="h-4 w-4 text-blue-600" />;
            case "REVIEW_ADDED":
            case "REVIEW_REPLIED":
                return <Star className="h-4 w-4 text-amber-500" />;
            case "SYSTEM_ALERT":
                return <AlertTriangle className="h-4 w-4 text-rose-500" />;
            default:
                return <Bell className="h-4 w-4 text-[#005461]" />;
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getAudienceBadge = (audience: string) => {
        switch (audience) {
            case "Clients":
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        <User className="h-3 w-3" />
                        Clients
                    </span>
                );
            case "Providers":
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <ShieldCheck className="h-3 w-3" />
                        Providers
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                        <Users className="h-3 w-3" />
                        All Users
                    </span>
                );
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-xs">
            {/* Header / Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab("sent")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeTab === "sent"
                                ? "bg-[#005461] text-white shadow-2xs"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                    >
                        <History className="h-4 w-4" />
                        <span>Sent Broadcasts</span>
                        {sentHistory.length > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-bold">
                                {sentHistory.length}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("inbox")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeTab === "inbox"
                                ? "bg-[#005461] text-white shadow-2xs"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                    >
                        <Inbox className="h-4 w-4" />
                        <span>Platform Inbox</span>
                        {unreadCount > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-extrabold">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Inbox Toolbar Actions */}
                {activeTab === "inbox" && notifications.length > 0 && (
                    <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                            type="button"
                            onClick={() => onToggleFilterUnread(!filterUnreadOnly)}
                            className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-colors cursor-pointer ${filterUnreadOnly ? "bg-teal-50 border-teal-200 text-[#005461]" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                        >
                            {filterUnreadOnly ? "Showing Unread" : "Filter Unread"}
                        </button>

                        {unreadCount > 0 && (
                            <Button variant="outline" size="sm" onClick={onMarkAllAsRead} disabled={isMarkingAllRead} className="h-7 text-xs px-2.5 rounded-lg text-gray-600 gap-1 cursor-pointer">
                                <CheckCheck className="h-3.5 w-3.5" />
                                <span>Mark All Read</span>
                            </Button>
                        )}

                        <Button variant="outline" size="sm" onClick={onClearAll} disabled={isClearingAll} className="h-7 text-xs px-2 rounded-lg text-rose-600 hover:bg-rose-50 hover:text-rose-700 border-rose-200 gap-1 cursor-pointer">
                            <Trash2 className="h-3 w-3" />
                            <span>Clear</span>
                        </Button>
                    </div>
                )}
            </div>

            {/* TAB 1: INBOX */}
            {activeTab === "inbox" && (
                <div className="space-y-3">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-slate-50/50 animate-pulse space-y-2">
                                <div className="h-4 bg-slate-200 rounded w-1/3" />
                                <div className="h-3 bg-slate-100 rounded w-4/5" />
                                <div className="h-3 bg-slate-100 rounded w-1/4" />
                            </div>
                        ))
                    ) : notifications.length === 0 ? (
                        <div className="text-center py-12 space-y-2">
                            <div className="h-12 w-12 rounded-2xl bg-teal-50 text-[#005461] flex items-center justify-center mx-auto">
                                <Inbox className="h-6 w-6" />
                            </div>
                            <p className="text-sm font-bold text-gray-900">{filterUnreadOnly ? "No unread notifications" : "Inbox is empty"}</p>
                            <p className="text-xs text-gray-400">{filterUnreadOnly ? "All caught up! Switch filter to view all notifications." : "You have no incoming platform notifications at this time."}</p>
                        </div>
                    ) : (
                        notifications.map((item) => (
                            <div key={item._id} className={`p-4 rounded-xl border transition-all duration-200 relative group ${!item.isRead ? "bg-teal-50/30 border-teal-200/80 hover:border-teal-300 shadow-2xs" : "bg-white border-gray-100 hover:border-gray-200"}`}>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-xl bg-white border border-gray-100 shadow-2xs shrink-0 mt-0.5">{getTypeIcon(item.type)}</div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-gray-900 text-sm leading-snug">{item.title}</h4>
                                                {!item.isRead && <span className="h-2 w-2 rounded-full bg-[#005461] ring-2 ring-teal-100" />}
                                            </div>
                                            <p className="text-xs text-gray-600 leading-relaxed">{item.message}</p>
                                            <div className="flex items-center gap-3 pt-1 text-[11px] text-gray-400 font-medium">
                                                <span>{formatDate(item.createdAt)}</span>
                                                {item.sender?.name && <span>From: {item.sender.name}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {!item.isRead && (
                                            <button type="button" onClick={() => onMarkAsRead(item._id)} title="Mark as read" className="p-1.5 rounded-lg text-teal-700 hover:bg-teal-100/60 transition-colors cursor-pointer">
                                                <Check className="h-4 w-4" />
                                            </button>
                                        )}
                                        <button type="button" onClick={() => onDeleteNotification(item._id)} title="Delete notification" className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer">
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Pagination */}
                    {meta && meta.totalPages > 1 && (
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <span className="text-xs text-gray-500">
                                Page {meta.page} of {meta.totalPages} ({meta.total} total)
                            </span>
                            <div className="flex items-center gap-1.5">
                                <Button variant="outline" size="sm" disabled={!meta.hasPrev || isLoading} onClick={() => onPageChange(meta.page - 1)} className="h-7 px-2 text-xs rounded-lg cursor-pointer disabled:opacity-40">
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="outline" size="sm" disabled={!meta.hasNext || isLoading} onClick={() => onPageChange(meta.page + 1)} className="h-7 px-2 text-xs rounded-lg cursor-pointer disabled:opacity-40">
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB 2: SENT BROADCASTS */}
            {activeTab === "sent" && (
                <div className="space-y-3">
                    {sentHistory.length === 0 ? (
                        <div className="text-center py-12 space-y-2">
                            <div className="h-12 w-12 rounded-2xl bg-teal-50 text-[#005461] flex items-center justify-center mx-auto">
                                <History className="h-6 w-6" />
                            </div>
                            <p className="text-sm font-bold text-gray-900">No broadcasts sent yet</p>
                            <p className="text-xs text-gray-400">Dispatched broadcasts will appear here with recipient statistics.</p>
                        </div>
                    ) : (
                        sentHistory.map((item) => (
                            <div key={item.id} className="p-4 rounded-xl border border-gray-100 bg-slate-50/50 hover:border-[#088395]/30 hover:shadow-2xs transition-all duration-200 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-bold text-gray-900 text-sm leading-snug">{item.title}</h3>
                                    {getAudienceBadge(item.audience)}
                                </div>

                                {item.message && <p className="text-xs text-gray-600 line-clamp-2">{item.message}</p>}

                                <div className="flex items-center justify-between text-xs text-gray-500 pt-1 font-medium">
                                    <span>{item.date}</span>
                                    <span className="font-semibold text-gray-700">{item.recipientsCount.toLocaleString()} recipients</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
