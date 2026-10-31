"use client";

import { Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { TUser } from "@/redux/features/auth/authSlice";
import { TUserMeta } from "@/redux/features/user/userApi";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface VerificationListProps {
    providers: TUser[];
    pendingCount: number;
    totalCount: number;
    selectedId: string | null;
    onSelect: (provider: TUser) => void;
    activeTab: "pending" | "all";
    onTabChange: (tab: "pending" | "all") => void;
    searchTerm: string;
    onSearchChange: (search: string) => void;
    isLoading?: boolean;
    meta?: TUserMeta;
    onPageChange?: (page: number) => void;
    onLimitChange?: (limit: number) => void;
}

export function VerificationList({
    providers,
    pendingCount,
    totalCount,
    selectedId,
    onSelect,
    activeTab,
    onTabChange,
    searchTerm,
    onSearchChange,
    isLoading = false,
    meta,
    onPageChange,
    onLimitChange,
}: VerificationListProps) {
    return (
        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs flex flex-col h-full space-y-4">
            {/* Header with Title and Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#005461]/10">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onTabChange("pending")}
                        className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                            activeTab === "pending"
                                ? "bg-[#005461] text-white shadow-2xs"
                                : "bg-[#f0f9fa] text-[#005461]/70 hover:bg-[#E2EFF1] hover:text-[#005461]"
                        )}
                    >
                        <span>Pending</span>
                        <span
                            className={cn(
                                "px-1.5 py-0.2 rounded-full text-[10px] font-extrabold",
                                activeTab === "pending"
                                    ? "bg-white/20 text-white"
                                    : "bg-[#005461]/10 text-[#005461]"
                            )}
                        >
                            {pendingCount}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onTabChange("all")}
                        className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                            activeTab === "all"
                                ? "bg-[#005461] text-white shadow-2xs"
                                : "bg-[#f0f9fa] text-[#005461]/70 hover:bg-[#E2EFF1] hover:text-[#005461]"
                        )}
                    >
                        <span>All Providers</span>
                        <span
                            className={cn(
                                "px-1.5 py-0.2 rounded-full text-[10px] font-extrabold",
                                activeTab === "all"
                                    ? "bg-white/20 text-white"
                                    : "bg-[#005461]/10 text-[#005461]"
                            )}
                        >
                            {totalCount}
                        </span>
                    </button>
                </div>
            </div>

            {/* Search Input */}
            <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#005461]/40" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by business, owner name or ID..."
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-[#f0f9fa] border border-[#005461]/10 text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all"
                />
            </div>

            {/* Providers List */}
            <div className="space-y-2.5 overflow-y-auto max-h-165 pr-1">
                {isLoading ? (
                    <div className="space-y-2.5">
                        {[1, 2, 3, 4].map((n) => (
                            <div
                                key={n}
                                className="p-4 rounded-xl border border-[#005461]/10 bg-white animate-pulse space-y-2"
                            >
                                <div className="h-4 w-3/5 bg-[#005461]/10 rounded" />
                                <div className="h-3 w-2/5 bg-[#005461]/5 rounded" />
                            </div>
                        ))}
                    </div>
                ) : providers.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#005461]/60 space-y-2">
                        <div className="h-10 w-10 rounded-full bg-[#f0f9fa] text-[#005461]/40 mx-auto flex items-center justify-center">
                            {activeTab === "pending" ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                                <AlertCircle className="w-5 h-5" />
                            )}
                        </div>
                        <p className="font-semibold">
                            {activeTab === "pending"
                                ? "No pending provider applications to review."
                                : "No providers found."}
                        </p>
                        {searchTerm && (
                            <p className="text-[11px] text-[#005461]/40">
                                Try adjusting your search query.
                            </p>
                        )}
                    </div>
                ) : (
                    providers.map((provider) => {
                        const isSelected = selectedId === provider._id;
                        const businessName =
                            provider.businessDetails?.businessName || provider.name;
                        const ownerName = provider.name;
                        const businessType =
                            provider.businessDetails?.businessType || "Provider";

                        return (
                            <div
                                key={provider._id}
                                onClick={() => onSelect(provider)}
                                className={cn(
                                    "p-4 rounded-xl border transition-all cursor-pointer text-left select-none",
                                    isSelected
                                        ? "bg-[#f0f9fa] border-[#005461] shadow-2xs ring-2 ring-[#005461]/15"
                                        : "bg-white border-[#005461]/10 hover:border-[#005461]/30 hover:bg-[#f0f9fa]/40"
                                )}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <h4 className="text-sm font-bold text-[#005461] truncate">
                                        {businessName}
                                    </h4>

                                    {/* Status Badge */}
                                    {!provider.isApproved ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                                            <Clock className="w-2.5 h-2.5" />
                                            Pending
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                            <CheckCircle2 className="w-2.5 h-2.5" />
                                            Verified
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-1 text-xs text-[#005461]/70 font-medium">
                                    <p className="truncate">
                                        {ownerName} · {businessType}
                                    </p>
                                    <span className="text-[10px] font-mono text-[#005461]/50 shrink-0">
                                        {provider.referralCode ||
                                            provider._id.slice(-6).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination Controls */}
            {meta && meta.total > 0 && onPageChange && (
                <div className="pt-3 border-t border-[#005461]/10 shrink-0">
                    <Pagination
                        meta={meta}
                        onPageChange={onPageChange}
                        onLimitChange={onLimitChange}
                        limitOptions={[5, 10, 20]}
                        showLimitSelector={false}
                        showSummary={true}
                        showFirstLastButtons={false}
                    />
                </div>
            )}
        </div>
    );
}
