"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Building,
    Shield,
    Calendar,
    Ban,
    RotateCcw,
    Copy,
    Check,
    FileText,
    Star,
    Wallet,
    BookOpen,
    Layers,
    DollarSign,
    Clock,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Globe,
    FileCheck,
    Eye,
    ChevronDown,
    ChevronUp,
    Maximize2,
    ShieldCheck,
} from "lucide-react";
import { useGetSingleUserQuery, useUpdateUserStatusMutation } from "@/redux/features/user/userApi";
import { getImageUrl, isPdfFile } from "@/utils/imageUrl";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { DocumentPreviewModal } from "@/components/ui/DocumentPreviewModal";
import { cn } from "@/lib/utils";

interface ProviderDetailViewProps {
    providerId: string;
}

export function ProviderDetailView({ providerId }: ProviderDetailViewProps) {
    const { data: userResponse, isLoading, isError } = useGetSingleUserQuery(providerId);
    const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

    const [isSuspendConfirmOpen, setIsSuspendConfirmOpen] = useState(false);
    const [isApproveConfirmOpen, setIsApproveConfirmOpen] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [previewModalDoc, setPreviewModalDoc] = useState<{ title: string; url: string } | null>(null);
    const [inlinePreview, setInlinePreview] = useState<"biz" | "gov" | null>(null);

    const provider = userResponse?.data;

    const handleCopy = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    // Toggle active / suspended status
    const handleStatusToggle = async () => {
        if (!provider) return;
        try {
            await updateUserStatus({
                userId: provider._id,
                isActive: !provider.isActive,
            }).unwrap();
            setIsSuspendConfirmOpen(false);
        } catch (err) {
            console.error("Failed to update provider status:", err);
        }
    };

    // Approve provider account
    const handleApproveProvider = async () => {
        if (!provider) return;
        try {
            await updateUserStatus({
                userId: provider._id,
                isApproved: true,
            }).unwrap();
            setIsApproveConfirmOpen(false);
        } catch (err) {
            console.error("Failed to approve provider:", err);
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

    // Loading State
    if (isLoading) {
        return (
            <div className="p-6 md:p-8 space-y-6 max-w-375 mx-auto min-h-screen">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-32 bg-[#005461]/10 rounded-xl animate-pulse" />
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
    if (isError || !provider) {
        return (
            <div className="p-6 md:p-8 space-y-6 max-w-375 mx-auto min-h-screen">
                <Link
                    href="/providers"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#005461]/15 hover:bg-[#f0f9fa] text-[#005461] font-semibold text-xs transition-colors shadow-2xs group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    <span>Back to Providers</span>
                </Link>

                <div className="p-12 text-center rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-3">
                    <div className="h-12 w-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-lg font-bold text-[#005461]">Provider Not Found</h2>
                    <p className="text-xs text-[#005461]/70 max-w-sm mx-auto">
                        We couldn&apos;t retrieve the details for this provider ID. The account may have been removed or the link is invalid.
                    </p>
                    <Link
                        href="/providers"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#00424d] text-white font-bold text-xs shadow-xs transition-colors mt-2"
                    >
                        Return to Providers List
                    </Link>
                </div>
            </div>
        );
    }

    const avatarUrl = provider.profileImage ? getImageUrl(provider.profileImage) : null;
    const businessName = provider.businessDetails?.businessName || provider.name;

    const hasAddress =
        provider.address &&
        (provider.address.street ||
            provider.address.city ||
            provider.address.state ||
            provider.address.country ||
            provider.address.zipCode);

    const hasBusinessDetails =
        provider.businessDetails &&
        (provider.businessDetails.businessName ||
            provider.businessDetails.businessType ||
            provider.businessDetails.companyRegistrationNumber ||
            provider.businessDetails.vatNumber);

    const businessDocUrl = provider.businessDocument ? getImageUrl(provider.businessDocument) : null;
    const govIdUrl = provider.governmentIssuedId ? getImageUrl(provider.governmentIssuedId) : null;

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-375 mx-auto min-h-screen">
            {/* Top Navigation & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/providers"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#005461]/15 hover:bg-[#f0f9fa] text-[#005461] font-semibold text-xs transition-colors shadow-2xs group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back to Providers</span>
                    </Link>
                    <div className="h-5 w-px bg-[#005461]/15 hidden sm:block" />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#005461]/60 font-semibold uppercase tracking-wider">
                                Provider Profile
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#005461]/10 text-[#005461]">
                                {provider.referralCode || provider._id.slice(-6).toUpperCase()}
                            </span>
                        </div>
                        <h1 className="text-xl font-extrabold text-[#005461] tracking-tight">{businessName}</h1>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5">
                    {/* Approve Provider Button (if not yet approved) */}
                    {!provider.isApproved && (
                        <button
                            type="button"
                            onClick={() => setIsApproveConfirmOpen(true)}
                            disabled={isUpdating}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                        >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Approve Provider</span>
                        </button>
                    )}

                    {/* Suspend / Restore Action Button */}
                    <button
                        type="button"
                        onClick={() => setIsSuspendConfirmOpen(true)}
                        disabled={isUpdating}
                        className={cn(
                            "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50",
                            provider.isActive
                                ? "bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 border border-rose-200"
                                : "bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200"
                        )}
                    >
                        {isUpdating ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : provider.isActive ? (
                            <>
                                <Ban className="w-3.5 h-3.5" />
                                <span>Suspend Provider</span>
                            </>
                        ) : (
                            <>
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Restore Provider</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Provider Overview Card & Quick Stats */}
                <div className="space-y-6">
                    {/* Identity Overview */}
                    <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs text-center space-y-4">
                        {/* Avatar */}
                        <div className="relative inline-block mx-auto">
                            {avatarUrl ? (
                                <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-[#005461]/20 shadow-sm mx-auto">
                                    <Image
                                        src={avatarUrl}
                                        alt={provider.name || "Provider Avatar"}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="h-24 w-24 rounded-full bg-[#005461] text-white font-extrabold flex items-center justify-center text-3xl shadow-sm mx-auto">
                                    {(provider.name || "P").charAt(0).toUpperCase()}
                                </div>
                            )}

                            {/* Status Dot */}
                            <div
                                className={cn(
                                    "absolute bottom-0 right-1 h-5 w-5 rounded-full border-2 border-white flex items-center justify-center shadow-xs",
                                    provider.isActive ? "bg-emerald-500" : "bg-rose-500"
                                )}
                                title={provider.isActive ? "Active Account" : "Suspended Account"}
                            />
                        </div>

                        {/* Business & Owner Info */}
                        <div>
                            <h2 className="text-lg font-bold text-[#005461]">{businessName}</h2>
                            <p className="text-xs text-[#005461]/80 font-medium">Owner: {provider.name}</p>
                            <p className="text-xs text-[#005461]/60 mt-0.5">{provider.email}</p>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#005461]/10 text-[#005461]">
                                Provider
                            </span>

                            <span
                                className={cn(
                                    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border",
                                    provider.isApproved
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                )}
                            >
                                {provider.isApproved ? (
                                    <>
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        Verified
                                    </>
                                ) : (
                                    <>
                                        <Clock className="w-3.5 h-3.5" />
                                        Pending Approval
                                    </>
                                )}
                            </span>

                            <span
                                className={cn(
                                    "px-3 py-1 rounded-full text-xs font-bold border",
                                    provider.isActive
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : "bg-rose-50 text-rose-700 border-rose-200"
                                )}
                            >
                                {provider.isActive ? "Active" : "Suspended"}
                            </span>

                            {provider.isEmailVerified && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                                    Email Verified
                                </span>
                            )}
                        </div>

                        {/* Stats Summary Bar */}
                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#005461]/10">
                            <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-bold uppercase text-[#005461]/60 flex items-center gap-1">
                                    <Layers className="w-3 h-3 text-[#005461]" /> Listings
                                </span>
                                <span className="text-base font-extrabold text-[#005461] mt-0.5">
                                    {provider.listingCount ?? 0}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-bold uppercase text-[#005461]/60 flex items-center gap-1">
                                    <BookOpen className="w-3 h-3 text-[#005461]" /> Bookings
                                </span>
                                <span className="text-base font-extrabold text-[#005461] mt-0.5">
                                    {provider.bookingCount ?? 0}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-bold uppercase text-[#005461]/60 flex items-center gap-1">
                                    <DollarSign className="w-3 h-3 text-[#005461]" /> Revenue
                                </span>
                                <span className="text-base font-extrabold text-[#005461] mt-0.5">
                                    ${(provider.totalRevenue ?? 0).toLocaleString()}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-bold uppercase text-[#005461]/60 flex items-center gap-1">
                                    <Wallet className="w-3 h-3 text-[#005461]" /> Balance
                                </span>
                                <span className="text-base font-extrabold text-[#005461] mt-0.5">
                                    ${(provider.balance ?? 0).toFixed(2)}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-bold uppercase text-[#005461]/60 flex items-center gap-1">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-400" /> Rating
                                </span>
                                <span className="text-base font-extrabold text-[#005461] mt-0.5">
                                    {(provider.averageRating ?? 0).toFixed(1)}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-bold uppercase text-[#005461]/60">
                                    Reviews
                                </span>
                                <span className="text-base font-extrabold text-[#005461] mt-0.5">
                                    {provider.totalReviews ?? 0}
                                </span>
                            </div>
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
                                <span className="font-bold text-[#005461]">{formatDate(provider.createdAt)}</span>
                            </div>

                            <div className="pt-2 flex items-center justify-between">
                                <span className="text-[#005461]/70">Last Updated</span>
                                <span className="font-bold text-[#005461]">{formatDate(provider.updatedAt)}</span>
                            </div>

                            {provider.lastLogin && (
                                <div className="pt-2 flex items-center justify-between">
                                    <span className="text-[#005461]/70">Last Login</span>
                                    <span className="font-bold text-[#005461]">{formatDateTime(provider.lastLogin)}</span>
                                </div>
                            )}

                            <div className="pt-2 flex items-center justify-between">
                                <span className="text-[#005461]/70">Provider ID</span>
                                <button
                                    type="button"
                                    onClick={() => handleCopy(provider._id, "id")}
                                    className="font-mono font-bold text-[#005461] flex items-center gap-1 hover:text-[#005461]/70 transition-colors cursor-pointer"
                                    title="Click to copy ID"
                                >
                                    <span>{provider._id.slice(0, 10)}...</span>
                                    {copiedField === "id" ? (
                                        <Check className="w-3 h-3 text-emerald-600" />
                                    ) : (
                                        <Copy className="w-3 h-3 text-[#005461]/50" />
                                    )}
                                </button>
                            </div>

                            {provider.referralCode && (
                                <div className="pt-2 flex items-center justify-between">
                                    <span className="text-[#005461]/70">Referral Code</span>
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(provider.referralCode || "", "refCode")}
                                        className="font-mono font-bold text-[#005461] flex items-center gap-1 hover:text-[#005461]/70 transition-colors cursor-pointer"
                                        title="Click to copy Referral Code"
                                    >
                                        <span>{provider.referralCode}</span>
                                        {copiedField === "refCode" ? (
                                            <Check className="w-3 h-3 text-emerald-600" />
                                        ) : (
                                            <Copy className="w-3 h-3 text-[#005461]/50" />
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Information Cards */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact & Owner Details */}
                    <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-4">
                        <h3 className="font-bold text-[#005461] text-sm uppercase tracking-wider flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#005461]" /> Owner & Contact Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                            <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                    Owner Name
                                </span>
                                <span className="font-bold text-[#005461] block">{provider.name}</span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                    <Mail className="w-3 h-3 text-[#005461]" /> Email Address
                                </span>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-[#005461] truncate">{provider.email}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(provider.email, "email")}
                                        className="text-[#005461]/50 hover:text-[#005461] cursor-pointer"
                                        title="Copy email"
                                    >
                                        {copiedField === "email" ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-[#005461]" /> Phone Number
                                </span>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-[#005461] block">
                                        {provider.phone || (
                                            <span className="text-[#005461]/40 font-normal">Not provided</span>
                                        )}
                                    </span>
                                    {provider.phone && (
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(provider.phone || "", "phone")}
                                            className="text-[#005461]/50 hover:text-[#005461] cursor-pointer"
                                            title="Copy phone"
                                        >
                                            {copiedField === "phone" ? (
                                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-[#005461]" /> Role
                                </span>
                                <span className="font-bold text-[#005461] block">Provider</span>
                            </div>

                            {provider.website && (
                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1 sm:col-span-2">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                        <Globe className="w-3 h-3 text-[#005461]" /> Business Website
                                    </span>
                                    <a
                                        href={
                                            provider.website.startsWith("http")
                                                ? provider.website
                                                : `https://${provider.website}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-[#005461] hover:underline"
                                    >
                                        {provider.website}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Business Information */}
                    {hasBusinessDetails && (
                        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-4">
                            <h3 className="font-bold text-[#005461] text-sm uppercase tracking-wider flex items-center gap-2">
                                <Building className="w-4 h-4 text-[#005461]" /> Business Information
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                                        Registered Business Name
                                    </span>
                                    <span className="font-bold text-[#005461] block">
                                        {provider.businessDetails?.businessName || "—"}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                                        Business Type
                                    </span>
                                    <span className="font-bold text-[#005461] block">
                                        {provider.businessDetails?.businessType || "—"}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                                        Company Registration Number
                                    </span>
                                    <span className="font-bold text-[#005461] block">
                                        {provider.businessDetails?.companyRegistrationNumber || "—"}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                                        VAT Number
                                    </span>
                                    <span className="font-bold text-[#005461] block">
                                        {provider.businessDetails?.vatNumber || "—"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Location & Address */}
                    <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-4">
                        <h3 className="font-bold text-[#005461] text-sm uppercase tracking-wider flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#005461]" /> Location & Address
                        </h3>

                        {hasAddress ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1 sm:col-span-2">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                                        Street Address
                                    </span>
                                    <span className="font-bold text-[#005461] block">
                                        {provider.address?.street || "—"}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                                        City
                                    </span>
                                    <span className="font-bold text-[#005461] block">
                                        {provider.address?.city || "—"}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                                        State / Province
                                    </span>
                                    <span className="font-bold text-[#005461] block">
                                        {provider.address?.state || "—"}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                                        Country
                                    </span>
                                    <span className="font-bold text-[#005461] block">
                                        {provider.address?.country || "—"}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                                        Postal / Zip Code
                                    </span>
                                    <span className="font-bold text-[#005461] block">
                                        {provider.address?.zipCode || "—"}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 rounded-xl bg-[#f0f9fa] text-center text-xs text-[#005461]/60">
                                No physical address has been added for this provider.
                            </div>
                        )}
                    </div>

                    {/* Verification Documents (Business License & Gov ID) */}
                    {(businessDocUrl || govIdUrl) && (
                        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-[#005461] text-sm uppercase tracking-wider flex items-center gap-2">
                                    <FileCheck className="w-4 h-4 text-[#005461]" /> Verification Documents
                                </h3>
                                <span className="text-[11px] text-[#005461]/60 font-semibold">
                                    Click &quot;Preview&quot; or &quot;Inline View&quot; to inspect
                                </span>
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
                                                        <span className="text-xs font-bold text-[#005461]">
                                                            Business License / Document
                                                        </span>
                                                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#005461]/10 text-[#005461]">
                                                            {isPdfFile(businessDocUrl) ? "PDF Document" : "Image File"}
                                                        </span>
                                                    </div>
                                                    <span className="text-[11px] text-[#005461]/60 font-mono truncate block max-w-xs sm:max-w-md">
                                                        {businessDocUrl.split("/").pop()}
                                                    </span>
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
                                                    onClick={() =>
                                                        setInlinePreview(inlinePreview === "biz" ? null : "biz")
                                                    }
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
                                                    <iframe
                                                        src={businessDocUrl}
                                                        className="w-full h-130 rounded-lg border border-[#005461]/15 bg-white shadow-inner"
                                                        title="Business Document Preview"
                                                    />
                                                ) : (
                                                    <div className="p-3 bg-slate-50 border border-[#005461]/15 rounded-lg flex items-center justify-center max-h-125 overflow-auto">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={businessDocUrl}
                                                            alt="Business Document"
                                                            className="max-h-115 max-w-full rounded-md object-contain shadow-xs"
                                                        />
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
                                                        <span className="text-xs font-bold text-[#005461]">
                                                            Government-Issued ID
                                                        </span>
                                                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#005461]/10 text-[#005461]">
                                                            {isPdfFile(govIdUrl) ? "PDF Document" : "Image File"}
                                                        </span>
                                                    </div>
                                                    <span className="text-[11px] text-[#005461]/60 font-mono truncate block max-w-xs sm:max-w-md">
                                                        {govIdUrl.split("/").pop()}
                                                    </span>
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
                                                    onClick={() =>
                                                        setInlinePreview(inlinePreview === "gov" ? null : "gov")
                                                    }
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
                                                    <iframe
                                                        src={govIdUrl}
                                                        className="w-full h-130 rounded-lg border border-[#005461]/15 bg-white shadow-inner"
                                                        title="Government ID Preview"
                                                    />
                                                ) : (
                                                    <div className="p-3 bg-slate-50 border border-[#005461]/15 rounded-lg flex items-center justify-center max-h-125 overflow-auto">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={govIdUrl}
                                                            alt="Government ID"
                                                            className="max-h-115 max-w-full rounded-md object-contain shadow-xs"
                                                        />
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
            <DocumentPreviewModal
                isOpen={!!previewModalDoc}
                onClose={() => setPreviewModalDoc(null)}
                title={previewModalDoc?.title || "Document Preview"}
                url={previewModalDoc?.url}
            />

            {/* Suspend / Restore Confirmation Modal */}
            <ConfirmModal
                isOpen={isSuspendConfirmOpen}
                title={provider.isActive ? "Suspend Provider Account" : "Restore Provider Account"}
                variant={provider.isActive ? "danger" : "success"}
                confirmText={provider.isActive ? "Suspend Provider" : "Restore Provider"}
                cancelText="Cancel"
                isLoading={isUpdating}
                onConfirm={handleStatusToggle}
                onClose={() => setIsSuspendConfirmOpen(false)}
                description={
                    provider.isActive ? (
                        <div className="space-y-1.5">
                            <p>
                                Are you sure you want to suspend{" "}
                                <strong className="font-bold text-[#005461]">{businessName}</strong>?
                            </p>
                            <p className="text-[#005461]/70">
                                This provider will be immediately blocked from signing in, receiving new bookings, and accessing dashboard services until their account is restored.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            <p>
                                Are you sure you want to restore{" "}
                                <strong className="font-bold text-[#005461]">{businessName}</strong>?
                            </p>
                            <p className="text-[#005461]/70">
                                This provider will regain full access to their account, active listings, and booking management.
                            </p>
                        </div>
                    )
                }
            />

            {/* Approve Provider Confirmation Modal */}
            <ConfirmModal
                isOpen={isApproveConfirmOpen}
                title="Approve Provider Account"
                variant="success"
                confirmText="Approve Provider"
                cancelText="Cancel"
                isLoading={isUpdating}
                onConfirm={handleApproveProvider}
                onClose={() => setIsApproveConfirmOpen(false)}
                description={
                    <div className="space-y-1.5">
                        <p>
                            Are you sure you want to approve{" "}
                            <strong className="font-bold text-[#005461]">{businessName}</strong>?
                        </p>
                        <p className="text-[#005461]/70">
                            This will verify the provider&apos;s credentials, mark them as a Verified Provider, and allow their listings and services to appear publicly for bookings.
                        </p>
                    </div>
                }
            />
        </div>
    );
}

export default ProviderDetailView;
