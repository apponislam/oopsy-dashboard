"use client";

import React from "react";
import { SentNotification } from "./types";
import { History, MailCheck } from "lucide-react";

interface SentHistoryProps {
    history: SentNotification[];
}

export function SentHistory({ history }: SentHistoryProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#f0f9fa] text-[#088395]">
                    <History className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Sent History</h2>
            </div>

            <div className="space-y-4">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 rounded-xl border border-gray-100 bg-slate-50/50 hover:border-[#088395]/30 hover:shadow-2xs transition-all duration-200 space-y-2"
                    >
                        <h3 className="font-bold text-gray-900 text-sm leading-snug">
                            {item.title}
                        </h3>

                        <div className="text-xs text-gray-500 font-medium">
                            To: <span className="font-semibold text-gray-700">{item.audience}</span> · {item.date} · {item.recipientsCount.toLocaleString()} recipients
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 w-fit px-2.5 py-1 rounded-lg border border-emerald-100/80">
                            <MailCheck className="h-3.5 w-3.5" />
                            <span>📬 {item.openRate} open rate</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
