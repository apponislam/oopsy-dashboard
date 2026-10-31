"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Eye,
    CheckCircle2,
    XCircle,
    Loader2,
    ShieldCheck,
    Clock,
    ExternalLink,
    Mail,
    Phone,
    Calendar,
    AlertCircle,
} from "lucide-react";
import { TUser } from "@/redux/features/auth/authSlice";
import { getImageUrl, isPdfFile } from "@/utils/imageUrl";

interface VerificationDetailProps {
    provider: TUser | null;
    onViewDocument: (title: string, url: string) => void;
    onApprove: (providerId: string, notes: string) => Promise<void>;
    onReject: (providerId: string, notes: string) => Promise<void>;
    isUpdating: boolean;
}

export function VerificationDetail({
    provider,
    onViewDocument,
    onApprove,
    onReject,
    isUpdating,
}: VerificationDetailProps) {
    const [notes, setNotes] = useState(provider?.verificationNote || "");

    if (!provider) {
        return (
            <div className="p-8 rounded-2xl bg-white border border-[#005461]/10 shadow-xs flex flex-col items-center justify-center text-center h-full min-h-115 space-y-3">
                <div className="h-12 w-12 rounded-full bg-[#f0f9fa] text-[#005461]/40 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#005461]">No Provider Selected</h3>
                <p className="text-xs text-[#005461]/60 max-w-xs">
                    Select a provider from the list on the left to review their verification documents and credentials.
                </p>
            </div>
        );
    }

    const businessName = provider.businessDetails?.businessName || provider.name;
    const ownerName = provider.name;
    const businessType = provider.businessDetails?.businessType || "Provider";
    const appId = provider.referralCode || provider._id.slice(-6).toUpperCase();

    const businessDocUrl = provider.businessDocument
        ? getImageUrl(provider.businessDocument)
        : null;
    const govIdUrl = provider.governmentIssuedId
        ? getImageUrl(provider.governmentIssuedId)
        : null;

    const hasAnyDocuments = !!businessDocUrl || !!govIdUrl;

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

    const handleApproveClick = async () => {
        await onApprove(provider._id, notes);
    };

    const handleRejectClick = async () => {
        await onReject(provider._id, notes);
    };

    return (
        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs flex flex-col justify-between h-full space-y-6">
            <div className="space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#005461]/10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 tracking-wider">
                                Application Review
                            </span>
                            {!provider.isApproved ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                    <Clock className="w-2.5 h-2.5" />
                                    Pending Review
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle2 className="w-2.5 h-2.5" />
                                    Verified
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-extrabold text-[#005461] tracking-tight">
                            Review: {businessName}
                        </h3>
                    </div>

                    <Link
                        href={`/providers/${provider._id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#005461]/15 hover:bg-[#f0f9fa] text-[#005461] font-bold text-xs transition-colors self-start sm:self-auto shrink-0 shadow-2xs"
                        title="View Full Provider Profile"
                    >
                        <span>Full Profile</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {/* 4-Grid Key Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                            Business
                        </span>
                        <p className="font-extrabold text-[#005461] truncate">{businessName}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                            Owner
                        </span>
                        <p className="font-extrabold text-[#005461] truncate">{ownerName}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                            Type
                        </span>
                        <p className="font-extrabold text-[#005461] truncate">{businessType}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                            App ID
                        </span>
                        <p className="font-mono font-extrabold text-[#005461] truncate">{appId}</p>
                    </div>
                </div>

                {/* Contact & Meta Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-[#f0f9fa]/70 border border-[#005461]/5 flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-[#005461]/60 shrink-0" />
                        <span className="truncate text-[#005461] font-medium">{provider.email}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#f0f9fa]/70 border border-[#005461]/5 flex items-center gap-2 truncate">
                        <Phone className="w-3.5 h-3.5 text-[#005461]/60 shrink-0" />
                        <span className="truncate text-[#005461] font-medium">
                            {provider.phone || "No phone"}
                        </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#f0f9fa]/70 border border-[#005461]/5 flex items-center gap-2 truncate">
                        <Calendar className="w-3.5 h-3.5 text-[#005461]/60 shrink-0" />
                        <span className="truncate text-[#005461] font-medium">
                            Joined {formatDate(provider.createdAt)}
                        </span>
                    </div>
                </div>

                {/* Submitted Documents Section */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[#005461] uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#005461]" />
                            Submitted Documents
                        </h4>
                        <span className="text-[11px] text-[#005461]/50 font-medium">
                            Preview in-page
                        </span>
                    </div>

                    {!hasAnyDocuments ? (
                        <div className="p-4 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 text-center text-xs text-[#005461]/60 flex items-center justify-center gap-2">
                            <AlertCircle className="w-4 h-4 text-[#005461]/40" />
                            <span>No verification documents uploaded yet by this provider.</span>
                        </div>
                    ) : (
                        <div className="space-y-2.5">
                            {/* Business Document */}
                            {businessDocUrl && (
                                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/10 hover:bg-[#E2EFF1]/60 transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-9 w-9 rounded-lg bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-[#005461]">
                                                    Business Reg / License
                                                </span>
                                                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-[#005461]/10 text-[#005461]">
                                                    {isPdfFile(businessDocUrl) ? "PDF" : "Image"}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-[#005461]/60 font-mono truncate">
                                                {businessDocUrl.split("/").pop()}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onViewDocument(
                                                "Business License / Document",
                                                businessDocUrl
                                            )
                                        }
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#005461]/20 hover:bg-[#005461] hover:text-white text-[#005461] text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-2xs ml-3"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>View</span>
                                    </button>
                                </div>
                            )}

                            {/* Government-Issued ID */}
                            {govIdUrl && (
                                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/10 hover:bg-[#E2EFF1]/60 transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-9 w-9 rounded-lg bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-[#005461]">
                                                    Government-Issued ID
                                                </span>
                                                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-[#005461]/10 text-[#005461]">
                                                    {isPdfFile(govIdUrl) ? "PDF" : "Image"}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-[#005461]/60 font-mono truncate">
                                                {govIdUrl.split("/").pop()}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onViewDocument("Government-Issued ID", govIdUrl)
                                        }
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#005461]/20 hover:bg-[#005461] hover:text-white text-[#005461] text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-2xs ml-3"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>View</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Verification Notes */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#005461] uppercase tracking-wider">
                        Verification notes (optional)…
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Verification notes (optional)…"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        disabled={isUpdating}
                        className="w-full p-3 bg-[#f0f9fa] border border-[#005461]/15 rounded-xl text-xs font-medium text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white resize-none transition-all disabled:opacity-50"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#005461]/10 flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={handleRejectClick}
                    disabled={isUpdating}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-600 hover:text-white text-rose-700 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 shadow-2xs"
                >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                </button>

                <button
                    type="button"
                    onClick={handleApproveClick}
                    disabled={isUpdating}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#005461] hover:bg-[#00424d] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                >
                    {isUpdating ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Updating...</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{provider.isApproved ? "Update Verification" : "Approve & Verify"}</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
