"use client";

import { X, Mail, Shield, Calendar, BookOpen, Phone, MapPin, Building, Hash, Loader2 } from "lucide-react";
import { User } from "./types";
import { getImageUrl } from "@/utils/imageUrl";
import Image from "next/image";

interface UserDetailModalProps {
    user: User | null;
    onClose: () => void;
    onToggleStatus: (userId: string, currentActive: boolean, userName: string) => void;
    isUpdatingStatus?: boolean;
}

export function UserDetailModal({
    user,
    onClose,
    onToggleStatus,
    isUpdatingStatus = false,
}: UserDetailModalProps) {
    if (!user) return null;

    const formatDate = (dateString?: string) => {
        if (!dateString) return "—";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    const formatRole = (role?: string) => {
        if (!role) return "User";
        switch (role.toUpperCase()) {
            case "CLIENT":
                return "Client";
            case "PROVIDER":
                return "Provider";
            case "SUPER_ADMIN":
                return "Super Admin";
            case "ADMIN":
                return "Admin";
            default:
                return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
        }
    };

    const avatarUrl = user.profileImage ? getImageUrl(user.profileImage) : null;
    const addressStr = [user.address?.street, user.address?.city, user.address?.state, user.address?.country]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-lg w-full overflow-hidden">
                {/* Modal Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {avatarUrl ? (
                            <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 border border-[#005461]/20">
                                <Image
                                    src={avatarUrl}
                                    alt={user.name || "User Avatar"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="h-11 w-11 rounded-full bg-[#005461] text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0">
                                {(user.name || "U").charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h3 className="text-base font-bold text-[#005461]">{user.name}</h3>
                            <span className="text-xs text-[#005461]/60 font-mono font-semibold">
                                Code: {user.referralCode || user._id.slice(-6).toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg bg-white/80 hover:bg-white text-[#005461] flex items-center justify-center transition-colors cursor-pointer border border-[#005461]/10"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-[#005461]" /> Email Address
                            </span>
                            <span className="font-bold text-[#005461] truncate">{user.email}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Shield className="w-3 h-3 text-[#005461]" /> User Role
                            </span>
                            <span className="font-bold text-[#005461]">{formatRole(user.role)}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-[#005461]" /> Date Joined
                            </span>
                            <span className="font-bold text-[#005461]">{formatDate(user.createdAt)}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-[#005461]" /> Total Bookings
                            </span>
                            <span className="font-bold text-[#005461]">{user.bookingCount ?? 0}</span>
                        </div>

                        {user.phone && (
                            <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1 col-span-2 sm:col-span-1">
                                <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-[#005461]" /> Phone
                                </span>
                                <span className="font-bold text-[#005461]">{user.phone}</span>
                            </div>
                        )}

                        {user.referralCode && (
                            <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1 col-span-2 sm:col-span-1">
                                <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                    <Hash className="w-3 h-3 text-[#005461]" /> Referral Code
                                </span>
                                <span className="font-mono font-bold text-[#005461]">{user.referralCode}</span>
                            </div>
                        )}
                    </div>

                    {/* Business Details (if present) */}
                    {user.businessDetails?.businessName && (
                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Building className="w-3 h-3 text-[#005461]" /> Business Information
                            </span>
                            <span className="font-bold text-[#005461]">{user.businessDetails.businessName}</span>
                            {user.businessDetails.businessType && (
                                <span className="text-[#005461]/70 text-[11px]">Type: {user.businessDetails.businessType}</span>
                            )}
                        </div>
                    )}

                    {/* Address (if present) */}
                    {addressStr && (
                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#005461]" /> Address
                            </span>
                            <span className="font-semibold text-[#005461]">{addressStr}</span>
                        </div>
                    )}

                    {/* Status Pill */}
                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70">Account Status</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                                user.isActive
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                        >
                            {user.isActive ? "Active" : "Suspended"}
                        </span>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-[#f0f9fa] border-t border-[#005461]/10 flex items-center justify-between gap-3">
                    <button
                        type="button"
                        disabled={isUpdatingStatus}
                        onClick={() => onToggleStatus(user._id, user.isActive, user.name || "this user")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 ${
                            user.isActive
                                ? "bg-rose-600 hover:bg-rose-700 text-white"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                    >
                        {isUpdatingStatus ? (
                            <div className="flex items-center gap-1.5">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Updating...</span>
                            </div>
                        ) : user.isActive ? (
                            "Suspend Account"
                        ) : (
                            "Restore Account"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-gray-100 text-[#005461] font-bold text-xs border border-[#005461]/20 transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserDetailModal;
