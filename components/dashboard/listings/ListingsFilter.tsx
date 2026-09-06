"use client";

import { Search, ChevronDown } from "lucide-react";
import { FacilityType } from "./types";

export type ListingFilterType = "All Types" | FacilityType;

interface ListingsFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeTypeFilter: ListingFilterType;
    onTypeFilterChange: (typeFilter: ListingFilterType) => void;
}

export function ListingsFilter({
    searchQuery,
    onSearchChange,
    activeTypeFilter,
    onTypeFilterChange,
}: ListingsFilterProps) {
    const dropdownConfigs: { label: string; value: ListingFilterType; options: string[] }[] = [
        {
            label: "All Types",
            value: "All Types",
            options: ["All Types", "All Facilities", "Overview"],
        },
        {
            label: "Restroom",
            value: "Restroom",
            options: ["Restroom", "Single Stall", "Accessible", "Gender Neutral"],
        },
        {
            label: "Shower",
            value: "Shower",
            options: ["Shower", "Private Shower", "Hot Water", "Towel Service"],
        },
        {
            label: "Spa",
            value: "Spa",
            options: ["Spa", "Sauna & Jacuzzi", "Hot Tub", "Steam Bath"],
        },
        {
            label: "Locker",
            value: "Locker",
            options: ["Locker", "Small Storage", "Large Luggage", "Keycard Lock"],
        },
    ];

    return (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#005461]/40" />
                <input
                    type="text"
                    placeholder="Search…"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full h-10 pl-9 pr-4 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                />
            </div>

            {/* 5 Separate Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5">
                {dropdownConfigs.map((dd) => {
                    const isActive = activeTypeFilter === dd.value;

                    return (
                        <div key={dd.label} className="relative">
                            <select
                                value={isActive ? dd.value : dd.label}
                                onChange={() => onTypeFilterChange(dd.value)}
                                className={`h-10 px-3.5 pr-8 rounded-xl text-xs font-bold transition-all cursor-pointer appearance-none border ${
                                    isActive
                                        ? "bg-[#005461] text-white border-[#005461] shadow-2xs"
                                        : "bg-[#f0f9fa] text-[#005461] border-[#005461]/10 hover:border-[#005461]/30 hover:bg-[#E2EFF1]/60"
                                }`}
                            >
                                <option value={dd.label} className="bg-white text-[#005461]">
                                    {dd.label}
                                </option>
                                {dd.options.slice(1).map((opt) => (
                                    <option key={opt} value={dd.value} className="bg-white text-[#005461]">
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${
                                    isActive ? "text-white" : "text-[#005461]"
                                }`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
