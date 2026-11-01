"use client";

import React from "react";
import { Layers, Search, X, CheckCircle2, AlertCircle } from "lucide-react";

interface CategoriesHeaderProps {
    totalCount: number;
    activeCount: number;
    inactiveCount: number;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
}

export function CategoriesHeader({
    totalCount,
    activeCount,
    inactiveCount,
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
}: CategoriesHeaderProps) {
    return (
        <div className="space-y-4 pb-4 border-b border-[#005461]/10">
            {/* Top row: Title & Metric Badges */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#005461]/70">
                        <Layers className="h-4 w-4 text-[#005461]" />
                        <span>Platform Facility Directory</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-[#005461] tracking-tight">
                        Service Categories
                    </h1>
                    <p className="text-xs text-[#005461]/70 font-medium">
                        Create, modify, and monitor facility categories available to providers and users
                    </p>
                </div>

                {/* Counters Badges */}
                <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="px-3 py-1.5 rounded-xl bg-white border border-[#005461]/15 text-xs font-bold text-[#005461] flex items-center gap-2 shadow-2xs">
                        <Layers className="w-3.5 h-3.5 text-[#005461]/60" />
                        <span>Total:</span>
                        <span className="px-1.5 py-0.5 rounded-md bg-[#f0f9fa] text-[#005461] font-extrabold">
                            {totalCount}
                        </span>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs font-bold text-emerald-800 flex items-center gap-2 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Active:</span>
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-extrabold">
                            {activeCount}
                        </span>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs font-bold text-amber-800 flex items-center gap-2 shadow-2xs">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Inactive:</span>
                        <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-extrabold">
                            {inactiveCount}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom row: Search & Status Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#005461]/40 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search category by name or slug..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-9.5 pr-8 py-2 text-xs rounded-xl bg-white border border-[#005461]/15 text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all font-medium shadow-2xs"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => onSearchChange("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#005461]/40 hover:text-[#005461] p-0.5 rounded-md"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* Status Filter Dropdown */}
                <div className="flex items-center gap-2">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value)}
                        className="px-3 py-2 text-xs rounded-xl bg-white border border-[#005461]/15 text-[#005461] font-semibold focus:outline-none focus:ring-1 focus:ring-[#005461] cursor-pointer shadow-2xs"
                    >
                        <option value="">All Statuses</option>
                        <option value="true">Active Only</option>
                        <option value="false">Inactive Only</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default CategoriesHeader;
