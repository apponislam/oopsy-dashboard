"use client";

import { X, MapPin, Building2, Tag, DollarSign, CalendarCheck, Star } from "lucide-react";
import { Listing } from "./types";

interface ListingViewModalProps {
    listing: Listing | null;
    onClose: () => void;
    onToggleSuspend: (listingId: string) => void;
}

export function ListingViewModal({
    listing,
    onClose,
    onToggleSuspend,
}: ListingViewModalProps) {
    if (!listing) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#005461] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                            {listing.title.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#005461]">{listing.title}</h3>
                            <span className="text-xs text-[#005461]/60 font-mono font-semibold">
                                ID: {listing.id}
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
                                <Building2 className="w-3 h-3 text-[#005461]" /> Provider
                            </span>
                            <span className="font-bold text-[#005461]">{listing.provider}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Tag className="w-3 h-3 text-[#005461]" /> Facility Type
                            </span>
                            <span className="font-bold text-[#005461]">{listing.type}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#005461]" /> City
                            </span>
                            <span className="font-bold text-[#005461]">{listing.city}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <DollarSign className="w-3 h-3 text-[#005461]" /> Price
                            </span>
                            <span className="font-bold text-[#005461]">{listing.price}</span>
                        </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70 flex items-center gap-1">
                            <CalendarCheck className="w-3.5 h-3.5 text-[#005461]" /> Total Bookings
                        </span>
                        <span className="font-bold text-[#005461]">{listing.bookings}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70">Rating</span>
                        <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {listing.rating.toFixed(1)} / 5.0
                        </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70">Listing Status</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                                listing.status === "Live"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : listing.status === "Review"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : listing.status === "Paused"
                                    ? "bg-sky-50 text-sky-700 border border-sky-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                        >
                            {listing.status}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-[#f0f9fa] border-t border-[#005461]/10 flex items-center justify-between gap-3">
                    <button
                        onClick={() => onToggleSuspend(listing.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            listing.status === "Suspended"
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                : "bg-rose-600 hover:bg-rose-700 text-white"
                        }`}
                    >
                        {listing.status === "Suspended" ? "Restore Facility" : "Suspend Facility"}
                    </button>
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
