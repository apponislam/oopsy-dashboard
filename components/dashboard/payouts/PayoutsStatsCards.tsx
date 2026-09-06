"use client";

import { PayoutStats } from "./types";
import { Wallet, Clock, CheckCircle2, AlertOctagon } from "lucide-react";

interface PayoutsStatsCardsProps {
    stats: PayoutStats;
    activeStatFilter: string | null;
    onSelectStatFilter: (filter: string | null) => void;
}

export function PayoutsStatsCards({
    stats,
    activeStatFilter,
    onSelectStatFilter,
}: PayoutsStatsCardsProps) {
    const cards = [
        {
            key: "Scheduled",
            label: "Total Payable",
            value: stats.totalPayable,
            icon: Wallet,
            style: "bg-[#005461]/10 text-[#005461]",
        },
        {
            key: "Processing",
            label: "Processing",
            value: stats.processing,
            icon: Clock,
            style: "bg-sky-50 text-sky-700",
        },
        {
            key: "Completed",
            label: "Completed (Aug)",
            value: stats.completed,
            icon: CheckCircle2,
            style: "bg-emerald-50 text-emerald-700",
        },
        {
            key: "On Hold",
            label: "On Hold",
            value: stats.onHold,
            icon: AlertOctagon,
            style: "bg-rose-50 text-rose-700",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => {
                const Icon = card.icon;
                const isSelected = activeStatFilter === card.key;

                return (
                    <div
                        key={card.key}
                        onClick={() => onSelectStatFilter(isSelected ? null : card.key)}
                        className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer shadow-xs flex items-center justify-between ${
                            isSelected
                                ? "border-[#005461] ring-2 ring-[#005461]/20"
                                : "border-[#005461]/10 hover:border-[#088395]/40"
                        }`}
                    >
                        <div>
                            <span className="text-xs font-semibold text-[#005461]/70">
                                {card.label}
                            </span>
                            <h3 className="text-2xl font-extrabold text-[#005461] mt-1">
                                {card.value}
                            </h3>
                        </div>

                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${card.style}`}>
                            <Icon className="w-4 h-4" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
