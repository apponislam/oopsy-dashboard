import {
    IReview,
    IAdminReviewStats,
    IReviewUser,
    IReviewListing,
    IReviewBooking,
} from "@/redux/features/review/reviewApi";

export type ReviewStatus = "Flagged" | "Published" | "Under Review" | "Removed";

export interface ReviewStats {
    total: number;
    flagged: number;
    underReview: number;
    removed: number;
}

export function getReviewStatus(review: IReview): ReviewStatus {
    if (review.isDeleted) return "Removed";
    if (review.isFlagged) return "Flagged";
    if (review.isApproved === false) return "Under Review";
    return "Published";
}

export type { IReview, IAdminReviewStats, IReviewUser, IReviewListing, IReviewBooking };
