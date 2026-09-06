"use client";

import { Search } from "lucide-react";

export type RoleFilterOption = "All" | "Client" | "Provider";

interface UsersFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeRoleFilter: RoleFilterOption;
    onRoleFilterChange: (role: RoleFilterOption) => void;
}

export function UsersFilter({
    searchQuery,
    onSearchChange,
    activeRoleFilter,
    onRoleFilterChange,
}: UsersFilterProps) {
    const roles: RoleFilterOption[] = ["All", "Client", "Provider"];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

            {/* Role Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#f0f9fa] p-1 rounded-xl border border-[#005461]/10 self-start sm:self-auto">
                {roles.map((role) => (
                    <button
                        key={role}
                        onClick={() => onRoleFilterChange(role)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            activeRoleFilter === role
                                ? "bg-[#005461] text-white shadow-2xs"
                                : "text-[#005461]/70 hover:text-[#005461] hover:bg-white/60"
                        }`}
                    >
                        {role}
                    </button>
                ))}
            </div>
        </div>
    );
}
