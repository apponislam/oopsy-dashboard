"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ProvidersHeader } from "./ProvidersHeader";
import { ProvidersStatsCards } from "./ProvidersStatsCards";
import { ProvidersTable } from "./ProvidersTable";
import { Pagination } from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import {
    TProviderStats,
    useGetAllUsersQuery,
    useUpdateUserStatusMutation,
} from "@/redux/features/user/userApi";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface StatusConfirmAction {
    userId: string;
    userName: string;
    currentActive: boolean;
}

export function ProvidersManagement() {
    const { page, limit, setPage, setLimit } = usePagination({ initialLimit: 10 });

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<StatusConfirmAction | null>(null);

    // Debounce search query to avoid spamming the backend
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, setPage]);

    // Handle filter selection from Stat Cards
    const handleSelectStatFilter = (filter: string | null) => {
        setActiveStatFilter(filter);
        setPage(1);
    };

    // Calculate filter params based on selected stat card
    const isApprovedParam =
        activeStatFilter === "Verified"
            ? true
            : activeStatFilter === "Pending"
            ? false
            : undefined;

    const isActiveParam = activeStatFilter === "Suspended" ? false : undefined;

    // Fetch providers from backend via RTK Query
    const {
        data: providersResponse,
        isLoading,
        isFetching,
    } = useGetAllUsersQuery({
        role: "PROVIDER",
        page,
        limit,
        searchTerm: debouncedSearch.trim() || undefined,
        isApproved: isApprovedParam,
        isActive: isActiveParam,
    });

    const [updateUserStatus] = useUpdateUserStatusMutation();

    // Trigger confirmation modal for Suspend / Restore
    const handleRequestToggleStatus = (userId: string, currentActive: boolean, userName: string) => {
        setConfirmAction({
            userId,
            userName,
            currentActive,
        });
    };

    // Execute status change after confirmation
    const handleConfirmStatusChange = async () => {
        if (!confirmAction) return;
        const { userId, currentActive } = confirmAction;

        try {
            setUpdatingUserId(userId);
            await updateUserStatus({
                userId,
                isActive: !currentActive,
            }).unwrap();
            setConfirmAction(null);
        } catch (error) {
            console.error("Failed to update provider status:", error);
        } finally {
            setUpdatingUserId(null);
        }
    };

    const providers = providersResponse?.data || [];
    const meta = providersResponse?.meta;
    const statsData = providersResponse?.stats;

    // Compute stats from backend data
    const stats: TProviderStats = {
        total: statsData?.providerStats?.total ?? statsData?.totalProviders ?? 0,
        verified: statsData?.providerStats?.verified ?? statsData?.verifiedProviders ?? 0,
        pending: statsData?.providerStats?.pending ?? statsData?.pendingProviders ?? 0,
        suspended: statsData?.providerStats?.suspended ?? statsData?.suspendedProviders ?? 0,
    };

    const activeCount = Math.max(0, stats.total - stats.suspended);

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header without Add Provider button */}
            <ProvidersHeader
                totalProviders={stats.total}
                activeProviders={activeCount}
            />

            {/* Summary Stat Cards */}
            <ProvidersStatsCards
                stats={stats}
                activeStatFilter={activeStatFilter}
                onSelectStatFilter={handleSelectStatFilter}
            />

            {/* Table Container */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-5">
                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#005461]/40" />
                        <input
                            type="text"
                            placeholder="Search providers by name, email, or business..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                        />
                    </div>

                    {activeStatFilter && (
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#005461]/60">Filtered by:</span>
                            <span className="font-bold text-[#005461] bg-[#005461]/10 px-2.5 py-1 rounded-lg">
                                {activeStatFilter}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleSelectStatFilter(null)}
                                className="text-xs text-rose-600 hover:underline font-bold cursor-pointer"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>

                {/* Providers Table */}
                <ProvidersTable
                    providers={providers}
                    isLoading={isLoading || isFetching}
                    onToggleStatus={handleRequestToggleStatus}
                    isUpdatingStatusId={updatingUserId}
                />

                {/* Pagination */}
                {meta && (
                    <div className="border-t border-[#005461]/10 pt-3">
                        <Pagination
                            meta={meta}
                            onPageChange={setPage}
                            onLimitChange={setLimit}
                            limitOptions={[10, 20, 50, 100]}
                            showLimitSelector={true}
                            showSummary={true}
                        />
                    </div>
                )}
            </div>

            {/* Suspend / Restore Confirmation Modal */}
            <ConfirmModal
                isOpen={!!confirmAction}
                title={confirmAction?.currentActive ? "Suspend Provider Account" : "Restore Provider Account"}
                variant={confirmAction?.currentActive ? "danger" : "success"}
                confirmText={confirmAction?.currentActive ? "Suspend Account" : "Restore Account"}
                cancelText="Cancel"
                isLoading={updatingUserId === confirmAction?.userId}
                onConfirm={handleConfirmStatusChange}
                onClose={() => {
                    if (updatingUserId !== confirmAction?.userId) {
                        setConfirmAction(null);
                    }
                }}
                description={
                    confirmAction?.currentActive ? (
                        <div className="space-y-1.5">
                            <p>
                                Are you sure you want to suspend{" "}
                                <strong className="font-bold text-[#005461]">{confirmAction.userName}</strong>?
                            </p>
                            <p className="text-[#005461]/70">
                                This provider will be immediately blocked from signing in, receiving new bookings, and accessing dashboard services until their account is restored.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            <p>
                                Are you sure you want to restore{" "}
                                <strong className="font-bold text-[#005461]">{confirmAction?.userName}</strong>?
                            </p>
                            <p className="text-[#005461]/70">
                                This provider will regain full access to their account, active listings, and booking management.
                            </p>
                        </div>
                    )
                }
            />
        </div>
    );
}

export default ProvidersManagement;
