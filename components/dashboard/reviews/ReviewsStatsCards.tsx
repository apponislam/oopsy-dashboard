"use client";

import React from "react";
import { ReviewStats } from "./types";
import { Star, Flag, Clock, Trash2 } from "lucide-react";

interface ReviewsStatsCardsProps {
    stats?: ReviewStats;
    isLoading?: boolean;
    activeStatFilter: string | null;
    onSelectStatFilter: (filter: string | null) => void;
}

export function ReviewsStatsCards({
    stats = { total: 0, flagged: 0, underReview: 0, removed: 0 },
    isLoading = false,
    activeStatFilter,
    onSelectStatFilter,
}: ReviewsStatsCardsProps) {
    const cards = [
        {
            key: "ALL",
            label: "Total Reviews",
            value: stats.total,
            icon: Star,
            bgStyle: "bg-teal-50 text-[#005461] border-teal-100/60",
            badgeStyle: "text-[#005461]",
        },
        {
            key: "FLAGGED",
            label: "Flagged",
            value: stats.flagged,
            icon: Flag,
            bgStyle: "bg-amber-50 text-amber-700 border-amber-200/60",
            badgeStyle: "text-amber-700",
        },
        {
            key: "UNDER_REVIEW",
            label: "Under Review",
            value: stats.underReview,
            icon: Clock,
            bgStyle: "bg-sky-50 text-sky-700 border-sky-200/60",
            badgeStyle: "text-sky-700",
        },
        {
            key: "REMOVED",
            label: "Removed",
            value: stats.removed,
            icon: Trash2,
            bgStyle: "bg-rose-50 text-rose-700 border-rose-200/60",
            badgeStyle: "text-rose-700",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => {
                const Icon = card.icon;
                const isSelected =
                    (activeStatFilter === card.key) ||
                    (!activeStatFilter && card.key === "ALL");

                return (
                    <div
                        key={card.key}
                        onClick={() =>
                            onSelectStatFilter(card.key === "ALL" ? null : card.key)
                        }
                        className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer shadow-xs flex items-center justify-between group ${
                            isSelected
                                ? "border-[#005461] ring-2 ring-[#005461]/15 shadow-sm"
                                : "border-gray-100 hover:border-[#005461]/30"
                        }`}
                    >
                        <div>
                            <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-700">
                                {card.label}
                            </span>
                            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                                {isLoading ? (
                                    <span className="inline-block h-6 w-12 bg-slate-100 rounded animate-pulse" />
                                ) : (
                                    card.value.toLocaleString()
                                )}
                            </h3>
                        </div>

                        <div
                            className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${card.bgStyle}`}
                        >
                            <Icon className="w-5 h-5" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
