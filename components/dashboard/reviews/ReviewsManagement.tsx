"use client";

import { useState } from "react";
import { ReviewItem, ReviewStats } from "./types";
import { ReviewsHeader } from "./ReviewsHeader";
import { ReviewsStatsCards } from "./ReviewsStatsCards";
import { ReviewsTable } from "./ReviewsTable";
import { ReviewDetailsModal } from "./ReviewDetailsModal";

const initialReviews: ReviewItem[] = [
    {
        id: "#R-421",
        reviewer: "James Wilson",
        facility: "CleanSpace Soho",
        rating: 1,
        comment: "Disgusting. Totally unacceptable conditions upon arrival.",
        date: "24 Aug",
        status: "Flagged",
    },
    {
        id: "#R-420",
        reviewer: "Emma Johnson",
        facility: "ZenSpa Soho",
        rating: 5,
        comment: "Absolutely wonderful experience! Super clean and relaxing.",
        date: "23 Aug",
        status: "Published",
    },
    {
        id: "#R-419",
        reviewer: "Oliver Brown",
        facility: "Refresh Point W1",
        rating: 2,
        comment: "Water was cold, felt unsafe. Needs immediate maintenance.",
        date: "22 Aug",
        status: "Under Review",
    },
    {
        id: "#R-418",
        reviewer: "Sarah Chen",
        facility: "CleanSpace Soho",
        rating: 4,
        comment: "Clean and convenient. Easy access and polite staff.",
        date: "21 Aug",
        status: "Published",
    },
];

const globalStats: ReviewStats = {
    total: 4218,
    flagged: 5,
    underReview: 12,
    removed: 38,
};

export function ReviewsManagement() {
    const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
    const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);
    const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

    const handleApprove = (reviewId: string) => {
        setReviews((prev) =>
            prev.map((r) => (r.id === reviewId ? { ...r, status: "Published" } : r))
        );
    };

    const handleRemove = (reviewId: string) => {
        setReviews((prev) =>
            prev.map((r) => (r.id === reviewId ? { ...r, status: "Removed" } : r))
        );
    };

    // Filter table by stat card click
    const filteredReviews = reviews.filter((r) => {
        if (!activeStatFilter || activeStatFilter === "Total") return true;
        return r.status === activeStatFilter;
    });

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <ReviewsHeader />

            {/* Summary Stat Cards */}
            <ReviewsStatsCards
                stats={globalStats}
                activeStatFilter={activeStatFilter}
                onSelectStatFilter={setActiveStatFilter}
            />

            {/* Table */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs">
                <ReviewsTable
                    reviews={filteredReviews}
                    onViewDetails={(review) => setSelectedReview(review)}
                    onApprove={handleApprove}
                    onRemove={handleRemove}
                />
            </div>

            {/* Details Modal */}
            <ReviewDetailsModal
                review={selectedReview}
                onClose={() => setSelectedReview(null)}
                onApprove={handleApprove}
                onRemove={handleRemove}
            />
        </div>
    );
}
