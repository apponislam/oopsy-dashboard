"use client";

import React from "react";
import Image from "next/image";
import { Eye, CheckCircle2, Trash2, Star, Flag, RotateCcw, Search, X, ChevronLeft, ChevronRight, User } from "lucide-react";
import { IReview, getReviewStatus, ReviewStatus } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "@/utils/imageUrl";

interface ReviewsTableProps {
    reviews: IReview[];
    isLoading: boolean;
    searchTerm: string;
    onSearchChange: (val: string) => void;
    ratingFilter: string;
    onRatingFilterChange: (val: string) => void;
    onViewDetails: (review: IReview) => void;
    onApprove: (reviewId: string) => void;
    onRemove: (reviewId: string) => void;
    onRestore: (reviewId: string) => void;
    meta?: {
        page: number;
        totalPages: number;
        total: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    onPageChange: (newPage: number) => void;
}

export function ReviewsTable({
    reviews,
    isLoading,
    searchTerm,
    onSearchChange,
    ratingFilter,
    onRatingFilterChange,
    onViewDetails,
    onApprove,
    onRemove,
    onRestore,
    meta,
    onPageChange,
}: ReviewsTableProps) {
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3 h-3 ${
                            i < Math.round(rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200 fill-slate-100"
                        }`}
                    />
                ))}
                <span className="text-[11px] font-bold text-gray-700 ml-1">
                    {Number(rating).toFixed(1)}
                </span>
            </div>
        );
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const renderStatusBadge = (status: ReviewStatus, isFlagged?: boolean) => {
        switch (status) {
            case "Published":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Published
                    </span>
                );
            case "Flagged":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Flag className="h-2.5 w-2.5" />
                        Flagged
                    </span>
                );
            case "Under Review":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                        Under Review
                    </span>
                );
            case "Removed":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        Removed
                    </span>
                );
        }
    };

    return (
        <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 max-w-md w-full">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by review text or flag reason..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-9 pr-9 rounded-xl border-gray-200 focus:border-[#005461]"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => onSearchChange("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <select
                        value={ratingFilter}
                        onChange={(e) => onRatingFilterChange(e.target.value)}
                        className="px-3 py-2 text-xs font-semibold bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#005461] cursor-pointer text-gray-700"
                    >
                        <option value="">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>

                <div className="text-xs text-gray-500 font-medium self-end sm:self-center">
                    Total: <span className="font-bold text-gray-800">{meta?.total ?? reviews.length}</span> reviews
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-500 bg-slate-50/70 font-bold uppercase text-[10px] tracking-wider">
                            <th className="py-3.5 px-4 w-[10%]">ID</th>
                            <th className="py-3.5 px-4 w-[18%]">Reviewer</th>
                            <th className="py-3.5 px-4 w-[18%]">Facility</th>
                            <th className="py-3.5 px-4 w-[12%]">Rating</th>
                            <th className="py-3.5 px-4 w-[22%]">Review</th>
                            <th className="py-3.5 px-4 w-[10%]">Date</th>
                            <th className="py-3.5 px-4 w-[10%]">Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white font-medium text-gray-700">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, idx) => (
                                <tr key={idx} className="animate-pulse">
                                    <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-16" /></td>
                                    <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-24" /></td>
                                    <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-28" /></td>
                                    <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-20" /></td>
                                    <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-40" /></td>
                                    <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-16" /></td>
                                    <td className="py-4 px-4"><div className="h-5 bg-slate-100 rounded-full w-16" /></td>
                                    <td className="py-4 px-4 text-right"><div className="h-7 bg-slate-100 rounded w-20 ml-auto" /></td>
                                </tr>
                            ))
                        ) : reviews.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="py-12 text-center text-gray-400 font-semibold">
                                    No reviews found matching the selected filter or search term.
                                </td>
                            </tr>
                        ) : (
                            reviews.map((item) => {
                                const status = getReviewStatus(item);
                                const reviewerName = item.user?.name || "Anonymous";
                                const facilityName = item.listing?.name || "Facility";
                                const avatarSrc = getImageUrl(item.user?.profileImage);

                                return (
                                    <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="py-3.5 px-4 font-mono font-bold text-gray-500">
                                            #{item._id.slice(-6).toUpperCase()}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-7 w-7 rounded-full bg-teal-50 text-[#005461] flex items-center justify-center overflow-hidden shrink-0 border border-teal-100">
                                                    {avatarSrc ? (
                                                        <Image
                                                            src={avatarSrc}
                                                            alt={reviewerName}
                                                            width={28}
                                                            height={28}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <User className="h-3.5 w-3.5" />
                                                    )}
                                                </div>
                                                <div className="leading-tight">
                                                    <span className="font-bold text-gray-900 block truncate max-w-[120px]">
                                                        {reviewerName}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 block truncate max-w-[120px]">
                                                        {item.user?.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="font-semibold text-gray-800 line-clamp-1">
                                                {facilityName}
                                            </span>
                                            {item.listing?.location?.city && (
                                                <span className="text-[10px] text-gray-400 block">
                                                    {item.listing.location.city}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            {renderStars(item.rating)}
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-600 max-w-xs">
                                            <p className="line-clamp-2 leading-relaxed">
                                                {item.comment}
                                            </p>
                                            {item.flagReason && (
                                                <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                                                    Flag: {item.flagReason}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-500 text-[11px] whitespace-nowrap">
                                            {formatDate(item.createdAt)}
                                        </td>
                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            {renderStatusBadge(status, item.isFlagged)}
                                        </td>
                                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {status !== "Published" && status !== "Removed" && (
                                                    <button
                                                        onClick={() => onApprove(item._id)}
                                                        title="Approve review"
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#005461] hover:bg-[#00424d] text-white font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                                                    >
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Approve
                                                    </button>
                                                )}

                                                {status !== "Removed" ? (
                                                    <button
                                                        onClick={() => onRemove(item._id)}
                                                        title="Remove review"
                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 font-bold text-[11px] transition-colors cursor-pointer border border-rose-200"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                        Remove
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => onRestore(item._id)}
                                                        title="Restore review"
                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold text-[11px] transition-colors cursor-pointer border border-emerald-200"
                                                    >
                                                        <RotateCcw className="w-3 h-3" />
                                                        Restore
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => onViewDetails(item)}
                                                    title="View details"
                                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#005461] hover:text-white text-gray-700 font-bold text-[11px] transition-colors cursor-pointer"
                                                >
                                                    <Eye className="w-3 h-3" />
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-gray-500">
                        Page <span className="font-semibold text-gray-800">{meta.page}</span> of{" "}
                        <span className="font-semibold text-gray-800">{meta.totalPages}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!meta.hasPrev || isLoading}
                            onClick={() => onPageChange(meta.page - 1)}
                            className="h-8 px-3 rounded-lg text-xs gap-1 cursor-pointer disabled:opacity-40"
                        >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!meta.hasNext || isLoading}
                            onClick={() => onPageChange(meta.page + 1)}
                            className="h-8 px-3 rounded-lg text-xs gap-1 cursor-pointer disabled:opacity-40"
                        >
                            Next
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
