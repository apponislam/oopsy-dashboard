"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Ban, RotateCcw, Loader2, Star, ShieldCheck, Clock } from "lucide-react";
import { TUser } from "@/redux/features/auth/authSlice";
import { getImageUrl } from "@/utils/imageUrl";

interface ProvidersTableProps {
    providers: TUser[];
    isLoading?: boolean;
    onToggleStatus: (userId: string, currentActive: boolean, userName: string) => void;
    isUpdatingStatusId?: string | null;
}

export function ProvidersTable({
    providers,
    isLoading = false,
    onToggleStatus,
    isUpdatingStatusId,
}: ProvidersTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">ID / Code</th>
                        <th className="py-3 px-3">Business</th>
                        <th className="py-3 px-3">Owner</th>
                        <th className="py-3 px-3">Listings</th>
                        <th className="py-3 px-3">Bookings</th>
                        <th className="py-3 px-3">Revenue</th>
                        <th className="py-3 px-3">Rating</th>
                        <th className="py-3 px-3">Verified</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                    {isLoading ? (
                        <tr>
                            <td colSpan={10} className="py-12 text-center text-[#005461]/60">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Loader2 className="w-6 h-6 animate-spin text-[#005461]" />
                                    <span className="text-xs font-semibold">Loading providers...</span>
                                </div>
                            </td>
                        </tr>
                    ) : providers.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="py-10 text-center text-[#005461]/50 font-semibold">
                                No providers found matching your search or filters.
                            </td>
                        </tr>
                    ) : (
                        providers.map((provider) => {
                            const isCurrentUpdating = isUpdatingStatusId === provider._id;
                            const displayId = provider.referralCode || provider._id.slice(-6).toUpperCase();
                            const avatarUrl = provider.profileImage ? getImageUrl(provider.profileImage) : null;
                            const businessTitle = provider.businessDetails?.businessName || provider.name;

                            return (
                                <tr key={provider._id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                    <td className="py-3.5 px-3 font-mono font-bold text-[#005461]/70">
                                        {displayId}
                                    </td>
                                    <td className="py-3.5 px-3 font-bold text-[#005461] max-w-42.5 truncate">
                                        {businessTitle}
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <div className="flex items-center gap-2.5">
                                            {avatarUrl ? (
                                                <div className="relative h-7 w-7 rounded-full overflow-hidden shrink-0 border border-[#005461]/20">
                                                    <Image
                                                        src={avatarUrl}
                                                        alt={provider.name || "Provider"}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="h-7 w-7 rounded-full bg-[#005461]/10 text-[#005461] font-bold text-xs flex items-center justify-center shrink-0">
                                                    {(provider.name || "P").charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <span className="font-bold text-[#005461] truncate block max-w-32.5">
                                                    {provider.name}
                                                </span>
                                                <span className="text-[10px] text-[#005461]/60 truncate block max-w-32.5">
                                                    {provider.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-3 font-bold">
                                        {provider.listingCount ?? 0}
                                    </td>
                                    <td className="py-3.5 px-3 font-bold">
                                        {provider.bookingCount ?? 0}
                                    </td>
                                    <td className="py-3.5 px-3 font-extrabold text-[#005461]">
                                        ${(provider.totalRevenue ?? 0).toLocaleString()}
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                            {(provider.averageRating ?? 0).toFixed(1)}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                                provider.isApproved
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                            }`}
                                        >
                                            {provider.isApproved ? (
                                                <>
                                                    <ShieldCheck className="w-3 h-3" />
                                                    ✓ Verified
                                                </>
                                            ) : (
                                                <>
                                                    <Clock className="w-3 h-3" />
                                                    Pending
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                                provider.isActive
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-rose-50 text-rose-700"
                                            }`}
                                        >
                                            {provider.isActive ? "Active" : "Suspended"}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Dedicated View Page Link */}
                                            <Link
                                                href={`/providers/${provider._id}`}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E2EFF1] hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-[11px] transition-colors cursor-pointer"
                                            >
                                                <Eye className="w-3 h-3" />
                                                View
                                            </Link>

                                            {/* Suspend / Restore Button (replaces Edit button) */}
                                            <button
                                                type="button"
                                                disabled={isCurrentUpdating}
                                                onClick={() =>
                                                    onToggleStatus(
                                                        provider._id,
                                                        provider.isActive,
                                                        provider.name || businessTitle
                                                    )
                                                }
                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer disabled:opacity-50 ${
                                                    provider.isActive
                                                        ? "bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700"
                                                        : "bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700"
                                                }`}
                                            >
                                                {isCurrentUpdating ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                ) : provider.isActive ? (
                                                    <>
                                                        <Ban className="w-3 h-3" />
                                                        Suspend
                                                    </>
                                                ) : (
                                                    <>
                                                        <RotateCcw className="w-3 h-3" />
                                                        Restore
                                                    </>
                                                )}
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
    );
}

export default ProvidersTable;
