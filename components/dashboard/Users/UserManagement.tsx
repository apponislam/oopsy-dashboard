"use client";

import { useState, useEffect } from "react";
import { User } from "./types";
import { UsersHeader } from "./UsersHeader";
import { UsersFilter, RoleFilterOption } from "./UsersFilter";
import { UsersTable } from "./UsersTable";
import { UserDetailModal } from "./UserDetailModal";
import { Pagination } from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { useGetAllUsersQuery, useUpdateUserStatusMutation } from "@/redux/features/user/userApi";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface StatusConfirmAction {
    userId: string;
    userName: string;
    currentActive: boolean;
}

export function UserManagement() {
    const { page, limit, setPage, setLimit } = usePagination({ initialLimit: 10 });

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [activeRoleFilter, setActiveRoleFilter] = useState<RoleFilterOption>("All");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
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

    const handleRoleChange = (role: RoleFilterOption) => {
        setActiveRoleFilter(role);
        setPage(1);
    };

    // Map UI role filter to backend query parameter
    const roleParam = activeRoleFilter === "All" ? undefined : activeRoleFilter.toUpperCase();

    // Fetch real users from backend via RTK Query
    const {
        data: usersResponse,
        isLoading,
        isFetching,
    } = useGetAllUsersQuery({
        page,
        limit,
        searchTerm: debouncedSearch.trim() || undefined,
        role: roleParam,
    });

    const [updateUserStatus] = useUpdateUserStatusMutation();

    // Open confirmation dialog before updating user status
    const handleRequestToggleStatus = (userId: string, currentActive: boolean, userName: string) => {
        setConfirmAction({
            userId,
            userName,
            currentActive,
        });
    };

    // Confirmed status update handler
    const handleConfirmStatusChange = async () => {
        if (!confirmAction) return;
        const { userId, currentActive } = confirmAction;

        try {
            setUpdatingUserId(userId);
            const res = await updateUserStatus({
                userId,
                isActive: !currentActive,
            }).unwrap();

            // If the detail modal is currently displaying this user, update its local state too
            if (selectedUser && selectedUser._id === userId && res?.data) {
                setSelectedUser(res.data);
            }
            setConfirmAction(null);
        } catch (error) {
            console.error("Failed to update user status:", error);
        } finally {
            setUpdatingUserId(null);
        }
    };

    const users = usersResponse?.data || [];
    const meta = usersResponse?.meta;

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <UsersHeader totalUsersCount={meta?.total} />

            {/* Content Container */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-5">
                {/* Search & Role Filters */}
                <UsersFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeRoleFilter={activeRoleFilter}
                    onRoleFilterChange={handleRoleChange}
                />

                {/* Table */}
                <UsersTable
                    users={users}
                    isLoading={isLoading || isFetching}
                    onViewUser={(user) => setSelectedUser(user)}
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

            {/* View Detail Modal */}
            <UserDetailModal
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                onToggleStatus={handleRequestToggleStatus}
                isUpdatingStatus={updatingUserId === selectedUser?._id}
            />

            {/* Suspend / Restore Confirmation Modal */}
            <ConfirmModal
                isOpen={!!confirmAction}
                title={confirmAction?.currentActive ? "Suspend User Account" : "Restore User Account"}
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
                                This user will be immediately blocked from signing in and accessing any services or bookings until their account is restored.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            <p>
                                Are you sure you want to restore{" "}
                                <strong className="font-bold text-[#005461]">{confirmAction?.userName}</strong>?
                            </p>
                            <p className="text-[#005461]/70">
                                This user will regain full access to their account, bookings, and dashboard services.
                            </p>
                        </div>
                    )
                }
            />
        </div>
    );
}

export default UserManagement;
