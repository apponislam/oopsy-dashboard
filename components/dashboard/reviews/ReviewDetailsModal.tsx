"use client";

import { X, Star, User, Building2, Calendar, MessageSquare, Tag } from "lucide-react";
import { ReviewItem } from "./types";

interface ReviewDetailsModalProps {
    review: ReviewItem | null;
    onClose: () => void;
    onApprove: (reviewId: string) => void;
    onRemove: (reviewId: string) => void;
}

export function ReviewDetailsModal({
    review,
    onClose,
    onApprove,
    onRemove,
}: ReviewDetailsModalProps) {
    if (!review) return null;

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${
                            i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-100"
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#005461] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#005461]">Review Details</h3>
                            <span className="text-xs text-[#005461]/60 font-mono font-semibold">
                                {review.id}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg bg-white/80 hover:bg-white text-[#005461] flex items-center justify-center transition-colors cursor-pointer border border-[#005461]/10"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <User className="w-3 h-3 text-[#005461]" /> Reviewer
                            </span>
                            <span className="font-bold text-[#005461]">{review.reviewer}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-[#005461]" /> Facility
                            </span>
                            <span className="font-bold text-[#005461]">{review.facility}</span>
                        </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                                Rating & Comment
                            </span>
                            {renderStars(review.rating)}
                        </div>
                        <p className="text-xs font-medium text-[#005461] leading-relaxed italic bg-white p-3 rounded-lg border border-[#005461]/10">
                            "{review.comment}"
                        </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#005461]" /> Date Submitted
                        </span>
                        <span className="font-bold text-[#005461]">{review.date}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70 flex items-center gap-1">
                            <Tag className="w-3.5 h-3.5 text-[#005461]" /> Status
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                                review.status === "Published"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : review.status === "Flagged"
                                    ? "bg-[#088395]/15 text-[#005461] border border-[#088395]/30"
                                    : review.status === "Under Review"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                        >
                            {review.status}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-[#f0f9fa] border-t border-[#005461]/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        {review.status !== "Published" && (
                            <button
                                onClick={() => {
                                    onApprove(review.id);
                                    onClose();
                                }}
                                className="px-3.5 py-2 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                            >
                                Approve
                            </button>
                        )}
                        {review.status !== "Removed" && (
                            <button
                                onClick={() => {
                                    onRemove(review.id);
                                    onClose();
                                }}
                                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-white border border-[#005461]/20 hover:bg-[#E2EFF1] text-[#005461] text-xs font-bold transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
