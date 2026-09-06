"use client";

import { Eye, CheckCircle2, Trash2, Star } from "lucide-react";
import { ReviewItem } from "./types";

interface ReviewsTableProps {
    reviews: ReviewItem[];
    onViewDetails: (review: ReviewItem) => void;
    onApprove: (reviewId: string) => void;
    onRemove: (reviewId: string) => void;
}

export function ReviewsTable({
    reviews,
    onViewDetails,
    onApprove,
    onRemove,
}: ReviewsTableProps) {
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3 h-3 ${
                            i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-100"
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3 px-3">Reviewer</th>
                        <th className="py-3 px-3">Facility</th>
                        <th className="py-3 px-3">Rating</th>
                        <th className="py-3 px-3">Review</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                    {reviews.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="py-8 text-center text-[#005461]/50 font-semibold">
                                No reviews found matching filter.
                            </td>
                        </tr>
                    ) : (
                        reviews.map((item) => (
                            <tr key={item.id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                <td className="py-3.5 px-3 font-mono font-bold text-[#005461]/70">
                                    {item.id}
                                </td>
                                <td className="py-3.5 px-3 font-bold text-[#005461]">{item.reviewer}</td>
                                <td className="py-3.5 px-3 text-[#005461]/80">{item.facility}</td>
                                <td className="py-3.5 px-3">{renderStars(item.rating)}</td>
                                <td className="py-3.5 px-3 text-[#005461]/80 max-w-xs truncate">
                                    {item.comment}
                                </td>
                                <td className="py-3.5 px-3 text-[#005461]/70">{item.date}</td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            item.status === "Published"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                : item.status === "Flagged"
                                                ? "bg-[#088395]/15 text-[#005461] border border-[#088395]/30 animate-pulse"
                                                : item.status === "Under Review"
                                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                : "bg-rose-50 text-rose-700 border border-rose-200"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                        {(item.status === "Flagged" || item.status === "Under Review") && (
                                            <>
                                                {item.status === "Flagged" && (
                                                    <button
                                                        onClick={() => onApprove(item.id)}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#005461] hover:bg-[#005461]/90 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                                                    >
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Approve
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => onRemove(item.id)}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 font-bold text-[11px] transition-colors cursor-pointer border border-rose-200"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                    Remove
                                                </button>
                                            </>
                                        )}

                                        <button
                                            onClick={() => onViewDetails(item)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E2EFF1] hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-[11px] transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-3 h-3" />
                                            View
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
