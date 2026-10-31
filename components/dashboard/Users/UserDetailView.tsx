"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, Phone, MapPin, Building, Shield, Calendar, Ban, RotateCcw, Copy, Check, ExternalLink, FileText, Star, Wallet, BookOpen, Clock, Loader2, CheckCircle2, AlertCircle, Globe, FileCheck, Eye, ChevronDown, ChevronUp, Maximize2 } from "lucide-react";
import { useGetSingleUserQuery, useUpdateUserStatusMutation } from "@/redux/features/user/userApi";
import { getImageUrl, isPdfFile } from "@/utils/imageUrl";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { DocumentPreviewModal } from "@/components/ui/DocumentPreviewModal";
import { cn } from "@/lib/utils";

interface UserDetailViewProps {
    userId: string;
}

export function UserDetailView({ userId }: UserDetailViewProps) {
    const { data: userResponse, isLoading, isError } = useGetSingleUserQuery(userId);
    const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [previewModalDoc, setPreviewModalDoc] = useState<{ title: string; url: string } | null>(null);
    const [inlinePreview, setInlinePreview] = useState<"biz" | "gov" | null>(null);

    const user = userResponse?.data;

    const handleCopy = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleStatusToggle = async () => {
        if (!user) return;
        try {
            await updateUserStatus({
                userId: user._id,
                isActive: !user.isActive,
            }).unwrap();
            setIsConfirmOpen(false);
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

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

    const formatDateTime = (dateString?: string) => {
        if (!dateString) return "—";
        try {
            return new Date(dateString).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
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

    // Loading State
    if (isLoading) {
        return (
            <div className="p-6 md:p-8 space-y-6 max-w-350 mx-auto min-h-screen">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-28 bg-[#005461]/10 rounded-xl animate-pulse" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="h-96 rounded-2xl bg-white border border-[#005461]/10 p-6 animate-pulse" />
                    <div className="lg:col-span-2 space-y-6">
                        <div className="h-48 rounded-2xl bg-white border border-[#005461]/10 p-6 animate-pulse" />
                        <div className="h-48 rounded-2xl bg-white border border-[#005461]/10 p-6 animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (isError || !user) {
        return (
            <div className="p-6 md:p-8 space-y-6 max-w-350 mx-auto min-h-screen">
                <Link href="/users" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#005461]/15 hover:bg-[#f0f9fa] text-[#005461] font-semibold text-xs transition-colors shadow-2xs group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    <span>Back to Users</span>
                </Link>

                <div className="p-12 text-center rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-3">
                    <div className="h-12 w-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-lg font-bold text-[#005461]">User Not Found</h2>
                    <p className="text-xs text-[#005461]/70 max-w-sm mx-auto">We couldn&apos;t retrieve the details for this user ID. The user may have been deleted or the link is invalid.</p>
                    <Link href="/users" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#00424d] text-white font-bold text-xs shadow-xs transition-colors mt-2">
                        Return to Users List
                    </Link>
                </div>
            </div>
        );
    }

    const avatarUrl = user.profileImage ? getImageUrl(user.profileImage) : null;
    const isProvider = user.role?.toUpperCase() === "PROVIDER";
    const isAdmin = user.role?.toUpperCase() === "SUPER_ADMIN" || user.role?.toUpperCase() === "ADMIN";

    const hasAddress = user.address && (user.address.street || user.address.city || user.address.state || user.address.country || user.address.zipCode);

    const hasBusinessDetails = user.businessDetails && (user.businessDetails.businessName || user.businessDetails.businessType || user.businessDetails.companyRegistrationNumber || user.businessDetails.vatNumber);

    const businessDocUrl = user.businessDocument ? getImageUrl(user.businessDocument) : null;
    const govIdUrl = user.governmentIssuedId ? getImageUrl(user.governmentIssuedId) : null;

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-375 mx-auto min-h-screen">
            {/* Top Navigation & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href="/users" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#005461]/15 hover:bg-[#f0f9fa] text-[#005461] font-semibold text-xs transition-colors shadow-2xs group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back to Users</span>
                    </Link>
                    <div className="h-5 w-px bg-[#005461]/15 hidden sm:block" />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#005461]/60 font-semibold uppercase tracking-wider">User Profile</span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#005461]/10 text-[#005461]">{user.referralCode || user._id.slice(-6).toUpperCase()}</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-[#005461] tracking-tight">{user.name}</h1>
                    </div>
                </div>

                {/* Status Toggle Action Button */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsConfirmOpen(true)}
                        disabled={isUpdating}
                        className={cn(
                            "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50",
                            user.isActive ? "bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 border border-rose-200" : "bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200",
                        )}
                    >
                        {isUpdating ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : user.isActive ? (
                            <>
                                <Ban className="w-3.5 h-3.5" />
                                <span>Suspend Account</span>
                            </>
                        ) : (
                            <>
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Restore Account</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: User Profile Card & Quick Stats */}
                <div className="space-y-6">
                    {/* Identity Overview */}
                    <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs text-center space-y-4">
                        {/* Avatar */}
                        <div className="relative inline-block mx-auto">
                            {avatarUrl ? (
                                <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-[#005461]/20 shadow-sm mx-auto">
                                    <Image src={avatarUrl} alt={user.name || "User Avatar"} fill className="object-cover" />
                                </div>
                            ) : (
                                <div className="h-24 w-24 rounded-full bg-[#005461] text-white font-extrabold flex items-center justify-center text-3xl shadow-sm mx-auto">{(user.name || "U").charAt(0).toUpperCase()}</div>
                            )}

                            {/* Status Dot */}
                            <div className={cn("absolute bottom-0 right-1 h-5 w-5 rounded-full border-2 border-white flex items-center justify-center shadow-xs", user.isActive ? "bg-emerald-500" : "bg-rose-500")} title={user.isActive ? "Active Account" : "Suspended Account"} />
                        </div>

                        {/* Name & Basic Info */}
                        <div>
                            <h2 className="text-lg font-bold text-[#005461]">{user.name}</h2>
                            <p className="text-xs text-[#005461]/70">{user.email}</p>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                            <span className={cn("px-3 py-1 rounded-full text-xs font-bold", isProvider ? "bg-[#005461]/10 text-[#005461]" : isAdmin ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-700")}>{formatRole(user.role)}</span>

                            <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", user.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200")}>{user.isActive ? "Active" : "Suspended"}</span>

                            {user.isEmailVerified && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                                    Verified
                                </span>
                            )}
                        </div>

                        {/* Stats Summary Bar */}
                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#005461]/10">
                            <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-bold uppercase text-[#005461]/60 flex items-center gap-1">
                                    <BookOpen className="w-3 h-3 text-[#005461]" /> Bookings
                                </span>
                                <span className="text-base font-extrabold text-[#005461] mt-0.5">{user.bookingCount ?? 0}</span>
                            </div>

                            <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-bold uppercase text-[#005461]/60 flex items-center gap-1">
                                    <Wallet className="w-3 h-3 text-[#005461]" /> Balance
                                </span>
                                <span className="text-base font-extrabold text-[#005461] mt-0.5">${(user.balance ?? 0).toFixed(2)}</span>
                            </div>

                            {isProvider && (
                                <>
                                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col items-center justify-center">
                                        <span className="text-[10px] font-bold uppercase text-[#005461]/60 flex items-center gap-1">
                                            <Star className="w-3 h-3 text-amber-500 fill-amber-400" /> Rating
                                        </span>
                                        <span className="text-base font-extrabold text-[#005461] mt-0.5">{(user.averageRating ?? 0).toFixed(1)}</span>
                                    </div>

                                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col items-center justify-center">
                                        <span className="text-[10px] font-bold uppercase text-[#005461]/60">Reviews</span>
                                        <span className="text-base font-extrabold text-[#005461] mt-0.5">{user.totalReviews ?? 0}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Metadata & Timeline Card */}
                    <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-3.5 text-xs">
                        <h3 className="font-bold text-[#005461] text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#005461]" /> Account Timeline
                        </h3>

                        <div className="space-y-2.5 divide-y divide-[#005461]/5">
                            <div className="pt-2 flex items-center justify-between">
                                <span className="text-[#005461]/70">Date Registered</span>
                                <span className="font-bold text-[#005461]">{formatDate(user.createdAt)}</span>
                            </div>

                            <div className="pt-2 flex items-center justify-between">
                                <span className="text-[#005461]/70">Last Updated</span>
                                <span className="font-bold text-[#005461]">{formatDate(user.updatedAt)}</span>
                            </div>

                            {user.lastLogin && (
                                <div className="pt-2 flex items-center justify-between">
                                    <span className="text-[#005461]/70">Last Login</span>
                                    <span className="font-bold text-[#005461]">{formatDateTime(user.lastLogin)}</span>
                                </div>
                            )}

                            <div className="pt-2 flex items-center justify-between">
                                <span className="text-[#005461]/70">User ID</span>
                                <button type="button" onClick={() => handleCopy(user._id, "id")} className="font-mono font-bold text-[#005461] flex items-center gap-1 hover:text-[#005461]/70 transition-colors cursor-pointer" title="Click to copy ID">
                                    <span>{user._id.slice(0, 10)}...</span>
                                    {copiedField === "id" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#005461]/50" />}
                                </button>
                            </div>

                            {user.referralCode && (
                                <div className="pt-2 flex items-center justify-between">
                                    <span className="text-[#005461]/70">Referral Code</span>
                                    <button type="button" onClick={() => handleCopy(user.referralCode || "", "refCode")} className="font-mono font-bold text-[#005461] flex items-center gap-1 hover:text-[#005461]/70 transition-colors cursor-pointer" title="Click to copy Referral Code">
                                        <span>{user.referralCode}</span>
                                        {copiedField === "refCode" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#005461]/50" />}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Information Cards */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact & Personal Information */}
                    <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-4">
                        <h3 className="font-bold text-[#005461] text-sm uppercase tracking-wider flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#005461]" /> Contact & Profile Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                            <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                    <Mail className="w-3 h-3 text-[#005461]" /> Email Address
                                </span>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-[#005461] truncate">{user.email}</span>
                                    <button type="button" onClick={() => handleCopy(user.email, "email")} className="text-[#005461]/50 hover:text-[#005461] cursor-pointer" title="Copy email">
                                        {copiedField === "email" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-[#005461]" /> Phone Number
                                </span>
                                <span className="font-bold text-[#005461] block">{user.phone || <span className="text-[#005461]/40 font-normal">Not provided</span>}</span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-[#005461]" /> Account Role
                                </span>
                                <span className="font-bold text-[#005461] block">{formatRole(user.role)}</span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-[#005461]" /> Verification Status
                                </span>
                                <span className="font-bold text-[#005461] block">{user.isEmailVerified ? <span className="text-emerald-700">Email Verified</span> : <span className="text-amber-700">Email Pending Verification</span>}</span>
                            </div>

                            {user.website && (
                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1 sm:col-span-2">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                        <Globe className="w-3 h-3 text-[#005461]" /> Website
                                    </span>
                                    <a href={user.website.startsWith("http") ? user.website : `https://${user.website}`} target="_blank" rel="noopener noreferrer" className="font-bold text-[#005461] hover:underline flex items-center gap-1">
                                        <span>{user.website}</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Address & Location */}
                    <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-4">
                        <h3 className="font-bold text-[#005461] text-sm uppercase tracking-wider flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#005461]" /> Location & Address
                        </h3>

                        {hasAddress ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1 sm:col-span-2">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">Street Address</span>
                                    <span className="font-bold text-[#005461] block">{user.address?.street || "—"}</span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">City</span>
                                    <span className="font-bold text-[#005461] block">{user.address?.city || "—"}</span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">State / Province</span>
                                    <span className="font-bold text-[#005461] block">{user.address?.state || "—"}</span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">Country</span>
                                    <span className="font-bold text-[#005461] block">{user.address?.country || "—"}</span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">Postal / Zip Code</span>
                                    <span className="font-bold text-[#005461] block">{user.address?.zipCode || "—"}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 rounded-xl bg-[#f0f9fa] text-center text-xs text-[#005461]/60">No physical address has been added for this user yet.</div>
                        )}
                    </div>

                    {/* Business Details (Visible for Providers or users with business details) */}
                    {(hasBusinessDetails || isProvider) && (
                        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-4">
                            <h3 className="font-bold text-[#005461] text-sm uppercase tracking-wider flex items-center gap-2">
                                <Building className="w-4 h-4 text-[#005461]" /> Business Information
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">Business Name</span>
                                    <span className="font-bold text-[#005461] block">{user.businessDetails?.businessName || "—"}</span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">Business Type</span>
                                    <span className="font-bold text-[#005461] block">{user.businessDetails?.businessType || "—"}</span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">Company Registration</span>
                                    <span className="font-bold text-[#005461] block">{user.businessDetails?.companyRegistrationNumber || "—"}</span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">VAT Number</span>
                                    <span className="font-bold text-[#005461] block">{user.businessDetails?.vatNumber || "—"}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Verification Documents (Gov ID, Business Docs) */}
                    {(businessDocUrl || govIdUrl) && (
                        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-[#005461] text-sm uppercase tracking-wider flex items-center gap-2">
                                    <FileCheck className="w-4 h-4 text-[#005461]" /> Verification Documents
                                </h3>
                                <span className="text-[11px] text-[#005461]/60 font-semibold">Click &quot;Preview&quot; or &quot;Inline View&quot; to inspect</span>
                            </div>

                            <div className="space-y-4">
                                {/* Business Document */}
                                {businessDocUrl && (
                                    <div className="rounded-xl border border-[#005461]/15 overflow-hidden bg-[#f0f9fa]/60 transition-all">
                                        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-[#005461]">Business License / Doc</span>
                                                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#005461]/10 text-[#005461]">{isPdfFile(businessDocUrl) ? "PDF Document" : "Image File"}</span>
                                                    </div>
                                                    <span className="text-[11px] text-[#005461]/60 font-mono truncate block max-w-xs sm:max-w-md">{businessDocUrl.split("/").pop()}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* In-Page Modal Preview Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPreviewModalDoc({
                                                            title: "Business License / Doc",
                                                            url: businessDocUrl,
                                                        })
                                                    }
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005461] hover:bg-[#00424d] text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Preview</span>
                                                </button>

                                                {/* Toggle Inline Preview Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => setInlinePreview(inlinePreview === "biz" ? null : "biz")}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#005461]/20 hover:bg-[#f0f9fa] text-[#005461] font-bold text-xs transition-colors cursor-pointer"
                                                >
                                                    {inlinePreview === "biz" ? (
                                                        <>
                                                            <ChevronUp className="w-3.5 h-3.5" />
                                                            <span>Hide</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ChevronDown className="w-3.5 h-3.5" />
                                                            <span>Inline View</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Inline In-Page Preview Frame */}
                                        {inlinePreview === "biz" && (
                                            <div className="p-3 bg-white border-t border-[#005461]/15 animate-in fade-in duration-200">
                                                <div className="mb-2 flex items-center justify-between text-xs">
                                                    <span className="font-semibold text-[#005461] flex items-center gap-1.5">
                                                        <Eye className="w-3.5 h-3.5 text-[#005461]" />
                                                        Previewing Business License / Doc
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setPreviewModalDoc({
                                                                title: "Business License / Doc",
                                                                url: businessDocUrl,
                                                            })
                                                        }
                                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#005461] hover:underline cursor-pointer"
                                                    >
                                                        <Maximize2 className="w-3 h-3" /> Fullscreen View
                                                    </button>
                                                </div>

                                                {isPdfFile(businessDocUrl) ? (
                                                    <iframe src={businessDocUrl} className="w-full h-130 rounded-lg border border-[#005461]/15 bg-white shadow-inner" title="Business Document Preview" />
                                                ) : (
                                                    <div className="p-3 bg-slate-50 border border-[#005461]/15 rounded-lg flex items-center justify-center max-h-125 overflow-auto">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={businessDocUrl} alt="Business Document" className="max-h-115 max-w-full rounded-md object-contain shadow-xs" />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Government-Issued ID */}
                                {govIdUrl && (
                                    <div className="rounded-xl border border-[#005461]/15 overflow-hidden bg-[#f0f9fa]/60 transition-all">
                                        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-[#005461]">Government-Issued ID</span>
                                                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#005461]/10 text-[#005461]">{isPdfFile(govIdUrl) ? "PDF Document" : "Image File"}</span>
                                                    </div>
                                                    <span className="text-[11px] text-[#005461]/60 font-mono truncate block max-w-xs sm:max-w-md">{govIdUrl.split("/").pop()}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* In-Page Modal Preview Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPreviewModalDoc({
                                                            title: "Government-Issued ID",
                                                            url: govIdUrl,
                                                        })
                                                    }
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005461] hover:bg-[#00424d] text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Preview</span>
                                                </button>

                                                {/* Toggle Inline Preview Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => setInlinePreview(inlinePreview === "gov" ? null : "gov")}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#005461]/20 hover:bg-[#f0f9fa] text-[#005461] font-bold text-xs transition-colors cursor-pointer"
                                                >
                                                    {inlinePreview === "gov" ? (
                                                        <>
                                                            <ChevronUp className="w-3.5 h-3.5" />
                                                            <span>Hide</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ChevronDown className="w-3.5 h-3.5" />
                                                            <span>Inline View</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Inline In-Page Preview Frame */}
                                        {inlinePreview === "gov" && (
                                            <div className="p-3 bg-white border-t border-[#005461]/15 animate-in fade-in duration-200">
                                                <div className="mb-2 flex items-center justify-between text-xs">
                                                    <span className="font-semibold text-[#005461] flex items-center gap-1.5">
                                                        <Eye className="w-3.5 h-3.5 text-[#005461]" />
                                                        Previewing Government-Issued ID
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setPreviewModalDoc({
                                                                title: "Government-Issued ID",
                                                                url: govIdUrl,
                                                            })
                                                        }
                                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#005461] hover:underline cursor-pointer"
                                                    >
                                                        <Maximize2 className="w-3 h-3" /> Fullscreen View
                                                    </button>
                                                </div>

                                                {isPdfFile(govIdUrl) ? (
                                                    <iframe src={govIdUrl} className="w-full h-130 rounded-lg border border-[#005461]/15 bg-white shadow-inner" title="Government ID Preview" />
                                                ) : (
                                                    <div className="p-3 bg-slate-50 border border-[#005461]/15 rounded-lg flex items-center justify-center max-h-125 overflow-auto">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={govIdUrl} alt="Government ID" className="max-h-115 max-w-full rounded-md object-contain shadow-xs" />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* In-Page Document Preview Modal (LightBox / Fullscreen) */}
            <DocumentPreviewModal isOpen={!!previewModalDoc} onClose={() => setPreviewModalDoc(null)} title={previewModalDoc?.title || "Document Preview"} url={previewModalDoc?.url} />

            {/* Suspend / Restore Confirmation Modal */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                title={user.isActive ? "Suspend User Account" : "Restore User Account"}
                variant={user.isActive ? "danger" : "success"}
                confirmText={user.isActive ? "Suspend Account" : "Restore Account"}
                cancelText="Cancel"
                isLoading={isUpdating}
                onConfirm={handleStatusToggle}
                onClose={() => setIsConfirmOpen(false)}
                description={
                    user.isActive ? (
                        <div className="space-y-1.5">
                            <p>
                                Are you sure you want to suspend <strong className="font-bold text-[#005461]">{user.name}</strong>?
                            </p>
                            <p className="text-[#005461]/70">This user will be immediately blocked from signing in and accessing any services or bookings until their account is restored.</p>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            <p>
                                Are you sure you want to restore <strong className="font-bold text-[#005461]">{user.name}</strong>?
                            </p>
                            <p className="text-[#005461]/70">This user will regain full access to their account, bookings, and dashboard services.</p>
                        </div>
                    )
                }
            />
        </div>
    );
}

export default UserDetailView;
