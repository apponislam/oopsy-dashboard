"use client";

import { PaymentStats } from "./types";
import { DollarSign, TrendingUp, RefreshCw, AlertTriangle } from "lucide-react";

interface PaymentsStatsCardsProps {
    stats: PaymentStats;
    activeStatFilter: string | null;
    onSelectStatFilter: (filter: string | null) => void;
}

export function PaymentsStatsCards({
    stats,
    activeStatFilter,
    onSelectStatFilter,
}: PaymentsStatsCardsProps) {
    const cards = [
        {
            key: "Volume",
            label: "Volume (Aug)",
            value: stats.volume,
            icon: DollarSign,
            style: "bg-[#005461]/10 text-[#005461]",
        },
        {
            key: "Revenue",
            label: "Platform Revenue",
            value: stats.revenue,
            icon: TrendingUp,
            style: "bg-emerald-50 text-emerald-700",
        },
        {
            key: "Refunds",
            label: "Refunds",
            value: stats.refunds,
            icon: RefreshCw,
            style: "bg-amber-50 text-amber-700",
        },
        {
            key: "Disputes",
            label: "Disputes",
            value: stats.disputes.toString(),
            icon: AlertTriangle,
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
