"use client";

import React, { useState, useEffect, useMemo } from "react";
import { IReview, ReviewStats } from "./types";
import { ReviewsHeader } from "./ReviewsHeader";
import { ReviewsStatsCards } from "./ReviewsStatsCards";
import { ReviewsTable } from "./ReviewsTable";
import { ReviewDetailsModal } from "./ReviewDetailsModal";
import {
    useGetAllReviewsAdminQuery,
    useGetReviewAdminStatsQuery,
    useUpdateReviewStatusAdminMutation,
    useAddReviewReplyMutation,
} from "@/redux/features/review/reviewApi";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

export function ReviewsManagement() {
    const [page, setPage] = useState(1);
    const limit = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);
    const [ratingFilter, setRatingFilter] = useState("");
    const [selectedReview, setSelectedReview] = useState<IReview | null>(null);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1);
        }, 350);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Reset page on filter changes
    const handleStatFilterChange = (filter: string | null) => {
        setActiveStatFilter(filter);
        setPage(1);
    };

    const handleRatingFilterChange = (rating: string) => {
        setRatingFilter(rating);
        setPage(1);
    };

    // Feedback notification toast
    const [feedbackNotice, setFeedbackNotice] = useState<{
        message: string;
        type: "success" | "warning";
    } | null>(null);

    const showFeedback = (message: string, type: "success" | "warning" = "success") => {
        setFeedbackNotice({ message, type });
        setTimeout(() => {
            setFeedbackNotice((curr) => (curr?.message === message ? null : curr));
        }, 3500);
    };

    // RTK Query Hooks
    const { data: response, isLoading: isReviewsLoading } = useGetAllReviewsAdminQuery({
        page,
        limit,
        searchTerm: debouncedSearch,
        status: activeStatFilter || undefined,
        rating: ratingFilter || undefined,
    });

    const { data: statsResponse, isLoading: isStatsLoading } = useGetReviewAdminStatsQuery();

    const [updateReviewStatusAdminMutation] = useUpdateReviewStatusAdminMutation();
    const [addReviewReplyMutation, { isLoading: isReplying }] = useAddReviewReplyMutation();

    const reviews = response?.data || [];
    const meta = response?.meta;

    const stats: ReviewStats = useMemo(() => {
        const s = statsResponse?.data || statsResponse?.stats || response?.stats;
        return {
            total: s?.total ?? 0,
            flagged: s?.flagged ?? 0,
            underReview: s?.underReview ?? s?.under_review ?? 0,
            removed: s?.removed ?? 0,
        };
    }, [statsResponse, response?.stats]);

    // Handle Approve
    const handleApprove = async (reviewId: string) => {
        try {
            await updateReviewStatusAdminMutation({
                id: reviewId,
                data: {
                    isApproved: true,
                    isFlagged: false,
                    isDeleted: false,
                },
            }).unwrap();
            showFeedback("Review approved and published successfully!", "success");

            if (selectedReview?._id === reviewId) {
                setSelectedReview((prev) =>
                    prev ? { ...prev, isApproved: true, isFlagged: false, isDeleted: false } : null
                );
            }
        } catch (error: unknown) {
            console.error("Failed to approve review:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg = errObj?.data?.message || errObj?.error || "Failed to approve review.";
            showFeedback(errMsg, "warning");
        }
    };

    // Handle Remove
    const handleRemove = async (reviewId: string) => {
        try {
            await updateReviewStatusAdminMutation({
                id: reviewId,
                data: {
                    isDeleted: true,
                },
            }).unwrap();
            showFeedback("Review removed from public platform", "success");

            if (selectedReview?._id === reviewId) {
                setSelectedReview((prev) => (prev ? { ...prev, isDeleted: true } : null));
            }
        } catch (error: unknown) {
            console.error("Failed to remove review:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg = errObj?.data?.message || errObj?.error || "Failed to remove review.";
            showFeedback(errMsg, "warning");
        }
    };

    // Handle Restore
    const handleRestore = async (reviewId: string) => {
        try {
            await updateReviewStatusAdminMutation({
                id: reviewId,
                data: {
                    isDeleted: false,
                    isApproved: true,
                },
            }).unwrap();
            showFeedback("Review restored successfully", "success");

            if (selectedReview?._id === reviewId) {
                setSelectedReview((prev) =>
                    prev ? { ...prev, isDeleted: false, isApproved: true } : null
                );
            }
        } catch (error: unknown) {
            console.error("Failed to restore review:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg = errObj?.data?.message || errObj?.error || "Failed to restore review.";
            showFeedback(errMsg, "warning");
        }
    };

    // Handle Add Reply
    const handleAddReply = async (reviewId: string, comment: string): Promise<boolean> => {
        try {
            const res = await addReviewReplyMutation({
                id: reviewId,
                comment,
            }).unwrap();
            showFeedback("Official reply added to review!", "success");

            if (selectedReview?._id === reviewId && res.data) {
                setSelectedReview(res.data);
            }
            return true;
        } catch (error: unknown) {
            console.error("Failed to add reply:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg = errObj?.data?.message || errObj?.error || "Failed to add reply.";
            showFeedback(errMsg, "warning");
            return false;
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Feedback notification toast */}
            {feedbackNotice && (
                <div
                    className={`fixed bottom-6 right-6 z-60 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200 ${
                        feedbackNotice.type === "success"
                            ? "bg-emerald-600 text-white"
                            : "bg-amber-600 text-white"
                    }`}
                >
                    {feedbackNotice.type === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                    )}
                    <span>{feedbackNotice.message}</span>
                    <button
                        onClick={() => setFeedbackNotice(null)}
                        className="p-1 hover:bg-black/10 rounded-lg ml-1 cursor-pointer"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}

            {/* Header */}
            <ReviewsHeader flaggedCount={stats.flagged} />

            {/* Summary Stat Cards */}
            <ReviewsStatsCards
                stats={stats}
                isLoading={isStatsLoading && isReviewsLoading}
                activeStatFilter={activeStatFilter}
                onSelectStatFilter={handleStatFilterChange}
            />

            {/* Table */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs">
                <ReviewsTable
                    reviews={reviews}
                    isLoading={isReviewsLoading}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    ratingFilter={ratingFilter}
                    onRatingFilterChange={handleRatingFilterChange}
                    onViewDetails={(review) => setSelectedReview(review)}
                    onApprove={handleApprove}
                    onRemove={handleRemove}
                    onRestore={handleRestore}
                    meta={meta}
                    onPageChange={setPage}
                />
            </div>

            {/* Details Modal */}
            <ReviewDetailsModal
                review={selectedReview}
                onClose={() => setSelectedReview(null)}
                onApprove={handleApprove}
                onRemove={handleRemove}
                onRestore={handleRestore}
                onAddReply={handleAddReply}
                isReplying={isReplying}
            />
        </div>
    );
}
