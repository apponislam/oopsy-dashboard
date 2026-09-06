"use client";

import React, { useState } from "react";
import { AudienceType } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Users, User, ShieldCheck } from "lucide-react";

interface SendNotificationFormProps {
    onSendNotification: (title: string, message: string, audience: AudienceType) => void;
}

export function SendNotificationForm({ onSendNotification }: SendNotificationFormProps) {
    const [audience, setAudience] = useState<AudienceType>("All");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !message.trim()) return;
        onSendNotification(title, message, audience);
        setTitle("");
        setMessage("");
    };

    const audienceOptions: { label: AudienceType; icon: React.ReactNode }[] = [
        { label: "All", icon: <Users className="h-3.5 w-3.5" /> },
        { label: "Clients", icon: <User className="h-3.5 w-3.5" /> },
        { label: "Providers", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#f0f9fa] text-[#088395]">
                    <Send className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Send Notification</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                        Audience
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {audienceOptions.map((opt) => (
                            <button
                                key={opt.label}
                                type="button"
                                onClick={() => setAudience(opt.label)}
                                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                                    audience === opt.label
                                        ? "bg-[#005461] border-[#005461] text-white shadow-xs"
                                        : "bg-slate-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {opt.icon}
                                <span>{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                        Title
                    </label>
                    <Input
                        type="text"
                        placeholder="Notification title…"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="rounded-xl border-gray-200"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                        Message
                    </label>
                    <textarea
                        placeholder="Notification body…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full min-h-[120px] p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005461]/20 focus:border-[#005461] transition-all resize-y"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-[#005461] hover:bg-[#00424d] text-white rounded-xl py-5 gap-2 font-medium shadow-xs mt-2"
                >
                    <Send className="h-4 w-4" />
                    Send to {audience}
                </Button>
            </form>
        </div>
    );
}
