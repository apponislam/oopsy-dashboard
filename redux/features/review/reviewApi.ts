import { baseApi } from "../../api/baseApi";

export interface IReviewUser {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
    role?: string;
    phone?: string;
}

export interface IReviewListing {
    _id: string;
    name: string;
    description?: string;
    photos?: string[];
    location?: {
        address?: string;
        city?: string;
        country?: string;
    };
    host?: {
        _id: string;
        name: string;
        email: string;
        phone?: string;
        profileImage?: string;
    };
    facilityType?: {
        _id: string;
        name: string;
        slug?: string;
        image?: string;
    };
}

export interface IReviewBooking {
    _id: string;
    bookingId?: string;
    date?: string;
    time?: string;
    price?: number;
    status?: string;
}

export interface IReviewReply {
    user?: IReviewUser;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IRatingCategories {
    cleanliness?: number;
    safety?: number;
    facilities?: number;
    privacy?: number;
    serviceQuality?: number;
}

export interface IReview {
    _id: string;
    user: IReviewUser;
    listing?: IReviewListing;
    booking?: IReviewBooking;
    rating: number;
    categories?: IRatingCategories;
    comment: string;
    photos?: string[];
    reply?: IReviewReply;
    isApproved?: boolean;
    isFlagged?: boolean;
    flagReason?: string;
    flaggedBy?: IReviewUser;
    flaggedAt?: string;
    isDeleted?: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface IAdminReviewStats {
    total: number;
    flagged: number;
    underReview: number;
    under_review?: number;
    removed: number;
}

export interface TReviewAdminQueryParams {
    searchTerm?: string;
    status?: string; // "ALL" | "FLAGGED" | "UNDER_REVIEW" | "REMOVED" | "PUBLISHED"
    isFlagged?: boolean | string;
    isApproved?: boolean | string;
    isDeleted?: boolean | string;
    rating?: number | string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export interface TReviewAdminResponse {
    statusCode?: number;
    success: boolean;
    message: string;
    data: IReview[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    stats: IAdminReviewStats;
}

export interface TReviewAdminStatsResponse {
    statusCode?: number;
    success: boolean;
    message: string;
    data: IAdminReviewStats;
    stats?: IAdminReviewStats;
}

export interface TUpdateReviewStatusPayload {
    isApproved?: boolean;
    isFlagged?: boolean;
    flagReason?: string;
    isDeleted?: boolean;
}

export const reviewApi = baseApi.enhanceEndpoints({ addTagTypes: ["Review"] }).injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // GET /reviews/admin - Super Admin reviews moderation list
        getAllReviewsAdmin: builder.query<TReviewAdminResponse, TReviewAdminQueryParams | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
                if (params?.status && params.status !== "ALL" && params.status !== "Total") {
                    queryParams.append("status", params.status);
                }
                if (params?.page) queryParams.append("page", String(params.page));
                if (params?.limit) queryParams.append("limit", String(params.limit));
                if (params?.rating) queryParams.append("rating", String(params.rating));
                if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
                if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

                const queryString = queryParams.toString();
                return {
                    url: queryString ? `/reviews/admin?${queryString}` : "/reviews/admin",
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["Review"],
        }),

        // GET /reviews/admin/stats - Super Admin review counts & metrics
        getReviewAdminStats: builder.query<TReviewAdminStatsResponse, void>({
            query: () => ({
                url: "/reviews/admin/stats",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Review"],
        }),

        // PATCH /reviews/admin/:id/status - Update approval, flag, or soft deletion
        updateReviewStatusAdmin: builder.mutation<{ success: boolean; message: string; data: IReview }, { id: string; data: TUpdateReviewStatusPayload }>({
            query: ({ id, data }) => ({
                url: `/reviews/admin/${id}/status`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Review"],
        }),

        // POST /reviews/:id/reply - Add host/admin reply
        addReviewReply: builder.mutation<{ success: boolean; message: string; data: IReview }, { id: string; comment: string }>({
            query: ({ id, comment }) => ({
                url: `/reviews/${id}/reply`,
                method: "POST",
                body: { comment },
                credentials: "include",
            }),
            invalidatesTags: ["Review"],
        }),

        // DELETE /reviews/:id - Hard or soft delete review
        deleteReview: builder.mutation<{ success: boolean; message: string; data: null }, string>({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Review"],
        }),
    }),
});

export const { useGetAllReviewsAdminQuery, useGetReviewAdminStatsQuery, useUpdateReviewStatusAdminMutation, useAddReviewReplyMutation, useDeleteReviewMutation } = reviewApi;
