"use client";

import { Eye, Ban, RotateCcw, Star } from "lucide-react";
import { Listing } from "./types";

interface ListingsTableProps {
    listings: Listing[];
    onViewListing: (listing: Listing) => void;
    onToggleSuspend: (listingId: string) => void;
}

export function ListingsTable({
    listings,
    onViewListing,
    onToggleSuspend,
}: ListingsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3 px-3">Listing</th>
                        <th className="py-3 px-3">Provider</th>
                        <th className="py-3 px-3">Type</th>
                        <th className="py-3 px-3">City</th>
                        <th className="py-3 px-3">Price</th>
                        <th className="py-3 px-3">Bookings</th>
                        <th className="py-3 px-3">Rating</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                    {listings.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="py-8 text-center text-[#005461]/50 font-semibold">
                                No listings found matching your search.
                            </td>
                        </tr>
                    ) : (
                        listings.map((item) => (
                            <tr key={item.id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                <td className="py-3.5 px-3 font-mono font-bold text-[#005461]/70">
                                    {item.id}
                                </td>
                                <td className="py-3.5 px-3 font-bold text-[#005461]">{item.title}</td>
                                <td className="py-3.5 px-3 text-[#005461]/80">{item.provider}</td>
                                <td className="py-3.5 px-3">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#005461]/10 text-[#005461]">
                                        {item.type}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-[#005461]/70">{item.city}</td>
                                <td className="py-3.5 px-3 font-extrabold text-[#005461]">{item.price}</td>
                                <td className="py-3.5 px-3 font-bold">{item.bookings}</td>
                                <td className="py-3.5 px-3">
                                    <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        {item.rating.toFixed(1)}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            item.status === "Live"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : item.status === "Review"
                                                ? "bg-amber-50 text-amber-700"
                                                : item.status === "Paused"
                                                ? "bg-sky-50 text-sky-700"
                                                : "bg-rose-50 text-rose-700"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onViewListing(item)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E2EFF1] hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-[11px] transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-3 h-3" />
                                            View
                                        </button>
                                        <button
                                            onClick={() => onToggleSuspend(item.id)}
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                                                item.status === "Suspended"
                                                    ? "bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700"
                                                    : "bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700"
                                            }`}
                                        >
                                            {item.status === "Suspended" ? (
                                                <>
                                                    <RotateCcw className="w-3 h-3" />
                                                    Restore
                                                </>
                                            ) : (
                                                <>
                                                    <Ban className="w-3 h-3" />
                                                    Suspend
                                                </>
                                            )}
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
