"use client";

import { useState } from "react";

interface BarData {
    month: string;
    amount: number; // in thousands
    label: string;
}

const barData: BarData[] = [
    { month: "Jan", amount: 110, label: "£110k" },
    { month: "Feb", amount: 125, label: "£125k" },
    { month: "Mar", amount: 140, label: "£140k" },
    { month: "Apr", amount: 135, label: "£135k" },
    { month: "May", amount: 160, label: "£160k" },
    { month: "Jun", amount: 155, label: "£155k" },
    { month: "Jul", amount: 172, label: "£172k" },
    { month: "Aug", amount: 182.4, label: "£182.4k" },
    { month: "Sep", amount: 190, label: "£190k" },
    { month: "Oct", amount: 195, label: "£195k" },
    { month: "Nov", amount: 205, label: "£205k" },
    { month: "Dec", amount: 220, label: "£220k" },
];

export function RevenueChart() {
    const [hoveredMonth, setHoveredMonth] = useState<string | null>("Aug");
    const maxAmount = 250;

    return (
        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs flex flex-col justify-between h-full">
            {/* Header */}
            <div>
                <h3 className="text-base font-bold text-[#005461]">Revenue</h3>
                <p className="text-xs text-[#005461]/60 font-medium mt-0.5">Gross platform volume before fees</p>
            </div>

            {/* Bar Chart Container */}
            <div className="mt-8 flex items-end justify-between gap-2 sm:gap-4 h-55 pt-6 px-2">
                {barData.map((item) => {
                    const heightPercent = (item.amount / maxAmount) * 100;
                    const isHovered = hoveredMonth === item.month;

                    return (
                        <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end" onMouseEnter={() => setHoveredMonth(item.month)}>
                            {/* Value tooltip label above bar */}
                            <span className={`text-[10px] font-bold transition-opacity duration-150 ${isHovered ? "opacity-100 text-[#005461]" : "opacity-0 text-[#005461]/60"}`}>{item.label}</span>

                            {/* Bar Track */}
                            <div className="w-full max-w-10.5 bg-[#E2EFF1]/50 rounded-t-xl h-full flex items-end overflow-hidden">
                                <div className={`w-full rounded-t-xl transition-all duration-300 ${isHovered ? "bg-[#005461] shadow-md scale-[1.02]" : "bg-[#088395] hover:bg-[#005461]"}`} style={{ height: `${heightPercent}%` }} />
                            </div>

                            {/* Month Label */}
                            <span className={`text-xs font-semibold transition-colors ${isHovered ? "text-[#005461] font-bold" : "text-[#005461]/60"}`}>{item.month}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
