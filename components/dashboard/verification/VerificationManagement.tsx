"use client";

import { useState, useEffect, useMemo } from "react";
import { VerificationHeader } from "./VerificationHeader";
import { VerificationList } from "./VerificationList";
import { VerificationDetail } from "./VerificationDetail";
import { DocumentPreviewModal } from "@/components/ui/DocumentPreviewModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import {
    useGetAllUsersQuery,
    useUpdateUserStatusMutation,
} from "@/redux/features/user/userApi";
import { TUser } from "@/redux/features/auth/authSlice";
import { usePagination } from "@/hooks/usePagination";

export function VerificationManagement() {
    const { page, limit, setPage, setLimit } = usePagination({
        initialPage: 1,
        initialLimit: 10,
    });

    const [activeTab, setActiveTab] = useState<"pending" | "all">("pending");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [previewDoc, setPreviewDoc] = useState<{ title: string; url: string } | null>(null);
    const [rejectConfirm, setRejectConfirm] = useState<{
        providerId: string;
        providerName: string;
        notes: string;
    } | null>(null);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 250);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Active tab determines whether to filter for unapproved providers only
    const isApprovedParam = activeTab === "pending" ? false : undefined;

    // Fetch providers with server pagination, tab filter, and search
    const {
        data: usersResponse,
        isLoading,
        isFetching,
    } = useGetAllUsersQuery({
        role: "PROVIDER",
        page,
        limit,
        searchTerm: debouncedSearch.trim() || undefined,
        isApproved: isApprovedParam,
    });

    const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

    const displayedProviders: TUser[] = useMemo(() => {
        return usersResponse?.data || [];
    }, [usersResponse]);

    const meta = usersResponse?.meta;
    const statsData = usersResponse?.stats;

    // Provider counts from stats or meta
    const totalCount =
        statsData?.providerStats?.total ??
        statsData?.totalProviders ??
        meta?.total ??
        0;

    const pendingCount =
        statsData?.providerStats?.pending ??
        statsData?.pendingProviders ??
        statsData?.pendingApprovals ??
        (activeTab === "pending" ? meta?.total ?? 0 : 0);

    // Determine active selected ID: use selectedId if present in list, otherwise fallback to first
    const activeSelectedId = useMemo(() => {
        if (selectedId && displayedProviders.some((p) => p._id === selectedId)) {
            return selectedId;
        }
        return displayedProviders[0]?._id || null;
    }, [selectedId, displayedProviders]);

    // Find the currently selected provider object
    const selectedProvider: TUser | null = useMemo(() => {
        if (!activeSelectedId) return null;
        return displayedProviders.find((p) => p._id === activeSelectedId) || null;
    }, [activeSelectedId, displayedProviders]);

    const handleTabChange = (tab: "pending" | "all") => {
        setActiveTab(tab);
        setPage(1);
    };

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        setPage(1);
    };

    // Handle Approve & Verify action
    const handleApprove = async (providerId: string, notes: string) => {
        try {
            await updateUserStatus({
                userId: providerId,
                isApproved: true,
                verificationNote: notes.trim() || undefined,
            }).unwrap();

            // Advance selection if on pending tab
            if (activeTab === "pending") {
                const remaining = displayedProviders.filter((p) => p._id !== providerId);
                setSelectedId(remaining.length > 0 ? remaining[0]._id : null);
            }
        } catch (error) {
            console.error("Failed to approve provider:", error);
        }
    };

    // Request Reject action (opens confirm modal)
    const handleRequestReject = async (providerId: string, notes: string) => {
        const provider = displayedProviders.find((p) => p._id === providerId);
        const name = provider?.businessDetails?.businessName || provider?.name || "Provider";
        setRejectConfirm({
            providerId,
            providerName: name,
            notes,
        });
    };

    // Execute Reject action
    const handleConfirmReject = async () => {
        if (!rejectConfirm) return;
        try {
            await updateUserStatus({
                userId: rejectConfirm.providerId,
                isApproved: false,
                verificationNote: rejectConfirm.notes.trim() || undefined,
            }).unwrap();

            // Advance selection if on pending tab
            if (activeTab === "pending") {
                const remaining = displayedProviders.filter((p) => p._id !== rejectConfirm.providerId);
                setSelectedId(remaining.length > 0 ? remaining[0]._id : null);
            }
            setRejectConfirm(null);
        } catch (error) {
            console.error("Failed to reject provider verification:", error);
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-375 mx-auto min-h-screen">
            {/* Header */}
            <VerificationHeader />

            {/* 2 Side 50/50 Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Left 50%: Provider List with Server Pagination */}
                <VerificationList
                    providers={displayedProviders}
                    pendingCount={pendingCount}
                    totalCount={totalCount}
                    selectedId={activeSelectedId}
                    onSelect={(p) => setSelectedId(p._id)}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    isLoading={isLoading || isFetching}
                    meta={meta}
                    onPageChange={setPage}
                    onLimitChange={setLimit}
                />

                {/* Right 50%: Review Details & Action Buttons */}
                <VerificationDetail
                    key={selectedProvider?._id || "none"}
                    provider={selectedProvider}
                    onViewDocument={(title, url) => setPreviewDoc({ title, url })}
                    onApprove={handleApprove}
                    onReject={handleRequestReject}
                    isUpdating={isUpdating}
                />
            </div>

            {/* In-Page Document Preview Modal */}
            <DocumentPreviewModal
                isOpen={!!previewDoc}
                title={previewDoc?.title || "Document Preview"}
                url={previewDoc?.url}
                onClose={() => setPreviewDoc(null)}
            />

            {/* Reject Confirmation Modal */}
            <ConfirmModal
                isOpen={!!rejectConfirm}
                title="Reject Verification Application"
                variant="danger"
                confirmText="Reject Application"
                cancelText="Cancel"
                isLoading={isUpdating}
                onConfirm={handleConfirmReject}
                onClose={() => setRejectConfirm(null)}
                description={
                    <div className="space-y-2">
                        <p>
                            Are you sure you want to reject the verification application for{" "}
                            <strong className="font-bold text-[#005461]">
                                {rejectConfirm?.providerName}
                            </strong>
                            ?
                        </p>
                        <p className="text-[#005461]/70">
                            The provider will not be approved for public listings. Any verification notes you entered will be saved on their account.
                        </p>
                    </div>
                }
            />
        </div>
    );
}

export default VerificationManagement;
