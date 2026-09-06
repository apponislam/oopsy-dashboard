"use client";

import { X, Building2, User, Star, ShieldCheck, DollarSign, CalendarCheck, MapPin } from "lucide-react";
import { Provider } from "./types";

interface ProviderViewModalProps {
    provider: Provider | null;
    onClose: () => void;
}

export function ProviderViewModal({ provider, onClose }: ProviderViewModalProps) {
    if (!provider) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#005461] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                            {provider.business.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#005461]">{provider.business}</h3>
                            <span className="text-xs text-[#005461]/60 font-mono font-semibold">
                                ID: {provider.id}
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
                                <User className="w-3 h-3 text-[#005461]" /> Owner
                            </span>
                            <span className="font-bold text-[#005461]">{provider.owner}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <DollarSign className="w-3 h-3 text-[#005461]" /> Total Revenue
                            </span>
                            <span className="font-bold text-[#005461]">{provider.revenue}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#005461]" /> Active Listings
                            </span>
                            <span className="font-bold text-[#005461]">{provider.listings}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <CalendarCheck className="w-3 h-3 text-[#005461]" /> Total Bookings
                            </span>
                            <span className="font-bold text-[#005461]">{provider.bookings}</span>
                        </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70">Rating</span>
                        <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {provider.rating.toFixed(1)} / 5.0
                        </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70">Verification Status</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                                provider.verified === "Verified"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                        >
                            {provider.verified === "Verified" ? "✓ Verified" : "Pending Verification"}
                        </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70">Account Status</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                                provider.status === "Active"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                        >
                            {provider.status}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-[#f0f9fa] border-t border-[#005461]/10 flex items-center justify-end">
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
