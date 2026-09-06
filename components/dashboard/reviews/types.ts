export type ReviewStatus = "Flagged" | "Published" | "Under Review" | "Removed";

export interface ReviewItem {
    id: string;
    reviewer: string;
    facility: string;
    rating: number; // e.g. 1, 2, 4, 5
    comment: string;
    date: string;
    status: ReviewStatus;
}

export interface ReviewStats {
    total: number;
    flagged: number;
    underReview: number;
    removed: number;
}
