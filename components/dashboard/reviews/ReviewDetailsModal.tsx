"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    X,
    Star,
    User,
    Building2,
    Calendar,
    MessageSquare,
    Tag,
    Flag,
    ShieldAlert,
    Send,
    Loader2,
} from "lucide-react";
import { IReview, getReviewStatus } from "./types";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/utils/imageUrl";

interface ReviewDetailsModalProps {
    review: IReview | null;
    onClose: () => void;
    onApprove: (reviewId: string) => void;
    onRemove: (reviewId: string) => void;
    onRestore: (reviewId: string) => void;
    onAddReply?: (reviewId: string, comment: string) => Promise<boolean>;
    isReplying?: boolean;
}

export function ReviewDetailsModal({
    review,
    onClose,
    onApprove,
    onRemove,
    onRestore,
    onAddReply,
    isReplying = false,
}: ReviewDetailsModalProps) {
    const [replyComment, setReplyComment] = useState("");

    if (!review) return null;

    const status = getReviewStatus(review);
    const reviewerName = review.user?.name || "Anonymous";
    const facilityName = review.listing?.name || "Facility";
    const avatarSrc = getImageUrl(review.user?.profileImage);

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${
                            i < Math.round(rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200 fill-slate-100"
                        }`}
                    />
                ))}
                <span className="text-xs font-bold text-gray-700 ml-1">
                    {Number(rating).toFixed(1)} / 5.0
                </span>
            </div>
        );
    };

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyComment.trim() || !onAddReply) return;
        const success = await onAddReply(review._id, replyComment.trim());
        if (success) {
            setReplyComment("");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div
                className="bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-5 bg-teal-50/50 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#005461] text-white flex items-center justify-center shadow-xs shrink-0">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-900">Review Moderation Details</h3>
                            <span className="text-xs text-gray-500 font-mono font-semibold">
                                #{review._id.slice(-8).toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer border border-gray-200/60"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4 text-xs flex-1 overflow-y-auto">
                    {/* Reviewer & Facility Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-100 flex flex-col gap-1.5">
                            <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                                <User className="w-3 h-3 text-[#005461]" /> Reviewer
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="h-7 w-7 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden shrink-0">
                                    {avatarSrc ? (
                                        <Image
                                            src={avatarSrc}
                                            alt={reviewerName}
                                            width={28}
                                            height={28}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-3.5 w-3.5 text-[#005461]" />
                                    )}
                                </div>
                                <div className="leading-tight">
                                    <span className="font-bold text-gray-900 block truncate">{reviewerName}</span>
                                    <span className="text-[10px] text-gray-500 block truncate">{review.user?.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-100 flex flex-col gap-1.5">
                            <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-[#005461]" /> Facility
                            </span>
                            <div className="leading-tight">
                                <span className="font-bold text-gray-900 block truncate">{facilityName}</span>
                                {review.listing?.location?.address && (
                                    <span className="text-[10px] text-gray-500 block truncate">
                                        {review.listing.location.address}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Rating & Categories */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-gray-100 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-gray-400">
                                Overall Rating
                            </span>
                            {renderStars(review.rating)}
                        </div>

                        {review.categories && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-gray-200/60 text-[11px]">
                                {review.categories.cleanliness !== undefined && (
                                    <div>Cleanliness: <span className="font-bold text-gray-900">{review.categories.cleanliness}/5</span></div>
                                )}
                                {review.categories.safety !== undefined && (
                                    <div>Safety: <span className="font-bold text-gray-900">{review.categories.safety}/5</span></div>
                                )}
                                {review.categories.facilities !== undefined && (
                                    <div>Facilities: <span className="font-bold text-gray-900">{review.categories.facilities}/5</span></div>
                                )}
                                {review.categories.privacy !== undefined && (
                                    <div>Privacy: <span className="font-bold text-gray-900">{review.categories.privacy}/5</span></div>
                                )}
                                {review.categories.serviceQuality !== undefined && (
                                    <div>Service: <span className="font-bold text-gray-900">{review.categories.serviceQuality}/5</span></div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Review Comment */}
                    <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">
                            User Comment
                        </span>
                        <div className="p-3.5 bg-white rounded-xl border border-gray-200 text-gray-800 leading-relaxed text-xs">
                            &ldquo;{review.comment}&rdquo;
                        </div>
                    </div>

                    {/* Photos if any */}
                    {review.photos && review.photos.length > 0 && (
                        <div className="space-y-1.5">
                            <span className="text-[10px] uppercase font-bold text-gray-400 block">
                                Attached Photos ({review.photos.length})
                            </span>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {review.photos.map((photo, i) => {
                                    const src = getImageUrl(photo);
                                    return (
                                        <div
                                            key={i}
                                            className="h-16 w-16 rounded-xl overflow-hidden border border-gray-200 relative shrink-0"
                                        >
                                            <Image
                                                src={src || photo}
                                                alt={`Review photo ${i + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Flag Warning */}
                    {review.isFlagged && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-800">
                            <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                            <div className="space-y-0.5 text-xs">
                                <span className="font-bold block">Flagged for Review</span>
                                <p className="text-[11px] text-amber-700">
                                    Reason: {review.flagReason || "Flagged by user for moderation"}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Reply Section */}
                    {review.reply ? (
                        <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/60 space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-[#005461]">
                                    Host / Admin Response:
                                </span>
                                <span className="text-gray-400">
                                    {review.reply.createdAt ? new Date(review.reply.createdAt).toLocaleDateString() : ""}
                                </span>
                            </div>
                            <p className="text-xs text-gray-700 leading-relaxed">
                                {review.reply.comment}
                            </p>
                        </div>
                    ) : onAddReply ? (
                        <form onSubmit={handleReplySubmit} className="space-y-2 pt-2 border-t border-gray-100">
                            <span className="text-[10px] uppercase font-bold text-gray-400 block">
                                Add Official Reply
                            </span>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Write an official response to this review..."
                                    value={replyComment}
                                    onChange={(e) => setReplyComment(e.target.value)}
                                    className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#005461]"
                                />
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={isReplying || !replyComment.trim()}
                                    className="bg-[#005461] hover:bg-[#00424d] text-white rounded-xl text-xs gap-1.5 cursor-pointer"
                                >
                                    {isReplying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                                    Reply
                                </Button>
                            </div>
                        </form>
                    ) : null}

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-gray-400 text-[11px] pt-1">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Submitted: {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                        <span className="font-bold text-gray-600">
                            Status: {status}
                        </span>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        {status !== "Published" && status !== "Removed" && (
                            <Button
                                size="sm"
                                onClick={() => {
                                    onApprove(review._id);
                                    onClose();
                                }}
                                className="bg-[#005461] hover:bg-[#00424d] text-white rounded-xl text-xs font-bold cursor-pointer"
                            >
                                Approve Review
                            </Button>
                        )}
                        {status !== "Removed" ? (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    onRemove(review._id);
                                    onClose();
                                }}
                                className="border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold cursor-pointer"
                            >
                                Remove Review
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    onRestore(review._id);
                                    onClose();
                                }}
                                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl text-xs font-bold cursor-pointer"
                            >
                                Restore Review
                            </Button>
                        )}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                        className="rounded-xl cursor-pointer"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
