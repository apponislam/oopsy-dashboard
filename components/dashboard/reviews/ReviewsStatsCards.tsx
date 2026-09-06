"use client";

import { ReviewStats } from "./types";
import { Star, Flag, Clock, Trash2 } from "lucide-react";

interface ReviewsStatsCardsProps {
    stats: ReviewStats;
    activeStatFilter: string | null;
    onSelectStatFilter: (filter: string | null) => void;
}

export function ReviewsStatsCards({
    stats,
    activeStatFilter,
    onSelectStatFilter,
}: ReviewsStatsCardsProps) {
    const cards = [
        {
            key: "Total",
            label: "Total",
            value: stats.total.toLocaleString(),
            icon: Star,
            style: "bg-[#005461]/10 text-[#005461]",
        },
        {
            key: "Flagged",
            label: "Flagged",
            value: stats.flagged.toString(),
            icon: Flag,
            style: "bg-[#088395]/15 text-[#005461]",
        },
        {
            key: "Under Review",
            label: "Under Review",
            value: stats.underReview.toString(),
            icon: Clock,
            style: "bg-amber-50 text-amber-700",
        },
        {
            key: "Removed",
            label: "Removed",
            value: stats.removed.toString(),
            icon: Trash2,
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
