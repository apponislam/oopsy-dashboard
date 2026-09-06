"use client";

import { Download } from "lucide-react";

interface UsersHeaderProps {
    totalUsersCount: number;
    onExportCSV: () => void;
}

export function UsersHeader({ totalUsersCount, onExportCSV }: UsersHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-[#005461]">User Management</h1>
                <p className="text-xs text-[#005461]/70 font-medium mt-0.5">
                    {totalUsersCount} registered users · 24 Aug 2026
                </p>
            </div>

            <button
                onClick={onExportCSV}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
                <Download className="w-4 h-4" />
                Export CSV
            </button>
        </div>
    );
}
