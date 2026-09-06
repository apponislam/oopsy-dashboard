"use client";

import { Users, TrendingUp, Calendar, AlertTriangle } from "lucide-react";

const metrics = [
    {
        title: "Total Users",
        badge: "↑ Growing",
        value: "24,891",
        subtext: "+342 this week",
        icon: Users,
        badgeStyle: "bg-[#088395]/15 text-[#005461]",
    },
    {
        title: "Monthly Revenue",
        badge: "On track",
        value: "£182,430",
        subtext: "+24% vs last month",
        icon: TrendingUp,
        badgeStyle: "bg-emerald-50 text-emerald-700",
    },
    {
        title: "Active Bookings",
        badge: "Normal",
        value: "8,942",
        subtext: "+18% this month",
        icon: Calendar,
        badgeStyle: "bg-[#E2EFF1] text-[#005461]",
    },
    {
        title: "Open Complaints",
        badge: "Attention",
        value: "14",
        subtext: "3 critical, urgent",
        icon: AlertTriangle,
        badgeStyle: "bg-amber-50 text-amber-700",
    },
];

export function MetricCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                    <div
                        key={metric.title}
                        className="p-5 rounded-2xl bg-white border border-[#005461]/10 shadow-xs flex flex-col justify-between"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#005461]/70">
                                {metric.title}
                            </span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${metric.badgeStyle}`}>
                                {metric.badge}
                            </span>
                        </div>

                        <div className="mt-3 flex items-baseline justify-between">
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-extrabold text-[#005461]">
                                    {metric.value}
                                </h2>
                                <p className="text-xs text-[#005461]/60 mt-1 font-medium">
                                    {metric.subtext}
                                </p>
                            </div>
                            <div className="h-9 w-9 rounded-xl bg-[#E2EFF1] text-[#005461] flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
