"use client";

import React, { useState } from "react";
import { AudienceType } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Users, User, ShieldCheck, Loader2, Sparkles, Bell } from "lucide-react";

interface SendNotificationFormProps {
    onSendNotification: (
        title: string,
        message: string,
        audience: AudienceType,
        type: string
    ) => Promise<boolean>;
    isSending: boolean;
}

export function SendNotificationForm({
    onSendNotification,
    isSending,
}: SendNotificationFormProps) {
    const [audience, setAudience] = useState<AudienceType>("All");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"SYSTEM_ALERT" | "GENERAL">("SYSTEM_ALERT");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedTitle = title.trim();
        const trimmedMessage = message.trim();
        if (!trimmedTitle || !trimmedMessage || isSending) return;

        const success = await onSendNotification(trimmedTitle, trimmedMessage, audience, type);
        if (success) {
            setTitle("");
            setMessage("");
        }
    };

    const audienceOptions: { label: AudienceType; icon: React.ReactNode; hint: string }[] = [
        { label: "All", icon: <Users className="h-4 w-4" />, hint: "Both clients & providers" },
        { label: "Clients", icon: <User className="h-4 w-4" />, hint: "Registered clients only" },
        { label: "Providers", icon: <ShieldCheck className="h-4 w-4" />, hint: "Verified providers only" },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-50 text-[#005461] border border-teal-100/60">
                        <Send className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-tight">Send Notification</h2>
                        <p className="text-xs text-gray-500">Dispatch in-app & push broadcast</p>
                    </div>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                        type="button"
                        onClick={() => setType("SYSTEM_ALERT")}
                        className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            type === "SYSTEM_ALERT"
                                ? "bg-white text-[#005461] shadow-2xs"
                                : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                        Alert
                    </button>
                    <button
                        type="button"
                        onClick={() => setType("GENERAL")}
                        className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            type === "GENERAL"
                                ? "bg-white text-[#005461] shadow-2xs"
                                : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                        General
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                        Target Audience <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                        {audienceOptions.map((opt) => {
                            const isSelected = audience === opt.label;
                            return (
                                <button
                                    key={opt.label}
                                    type="button"
                                    onClick={() => setAudience(opt.label)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                                        isSelected
                                            ? "bg-[#005461] border-[#005461] text-white shadow-xs"
                                            : "bg-slate-50/60 border-gray-200/80 text-gray-700 hover:bg-slate-100/80"
                                    }`}
                                >
                                    <div className="flex items-center gap-1.5 font-bold text-xs">
                                        {opt.icon}
                                        <span>{opt.label}</span>
                                    </div>
                                    <span
                                        className={`text-[10px] mt-0.5 line-clamp-1 ${
                                            isSelected ? "text-teal-100" : "text-gray-400"
                                        }`}
                                    >
                                        {opt.hint}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                        Title <span className="text-rose-500">*</span>
                    </label>
                    <Input
                        type="text"
                        placeholder="e.g. Scheduled Maintenance or New Feature"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="rounded-xl border-gray-200 focus:border-[#005461]"
                        disabled={isSending}
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            Message Body <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[11px] text-gray-400">{message.length} chars</span>
                    </div>
                    <textarea
                        placeholder="Write the full broadcast message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005461]/20 focus:border-[#005461] transition-all resize-y leading-relaxed"
                        disabled={isSending}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSending || !title.trim() || !message.trim()}
                    className="w-full bg-[#005461] hover:bg-[#00424d] text-white rounded-xl py-5 gap-2 font-semibold shadow-xs mt-2 cursor-pointer disabled:opacity-50"
                >
                    {isSending ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Broadcasting Notification...</span>
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            <span>Send Broadcast to {audience}</span>
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
