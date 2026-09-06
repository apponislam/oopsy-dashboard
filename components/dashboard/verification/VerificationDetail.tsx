"use client";

import { useState } from "react";
import { FileText, Eye, CheckCircle2, XCircle } from "lucide-react";
import { VerificationApplication, SubmittedDocument } from "./types";

interface VerificationDetailProps {
    application: VerificationApplication | null;
    onViewDocument: (doc: SubmittedDocument) => void;
    onApprove: (appId: string, notes: string) => void;
    onReject: (appId: string, notes: string) => void;
}

export function VerificationDetail({
    application,
    onViewDocument,
    onApprove,
    onReject,
}: VerificationDetailProps) {
    const [notes, setNotes] = useState("");

    if (!application) {
        return (
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs flex items-center justify-center h-full">
                <p className="text-xs font-semibold text-[#005461]/50">
                    Select an application from the left panel to review.
                </p>
            </div>
        );
    }

    const handleApprove = () => {
        onApprove(application.id, notes);
        setNotes("");
    };

    const handleReject = () => {
        onReject(application.id, notes);
        setNotes("");
    };

    return (
        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs flex flex-col justify-between h-full space-y-5">
            <div className="space-y-5">
                {/* Header */}
                <div className="pb-4 border-b border-[#005461]/10">
                    <h3 className="text-base font-bold text-[#005461]">
                        Review: {application.business}
                    </h3>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5">
                        <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                            Business
                        </span>
                        <p className="font-bold text-[#005461] mt-0.5">{application.business}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5">
                        <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                            Owner
                        </span>
                        <p className="font-bold text-[#005461] mt-0.5">{application.owner}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5">
                        <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                            Type
                        </span>
                        <p className="font-bold text-[#005461] mt-0.5">{application.type}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5">
                        <span className="text-[10px] uppercase font-bold text-[#005461]/60">
                            App ID
                        </span>
                        <p className="font-mono font-bold text-[#005461] mt-0.5">{application.appId}</p>
                    </div>
                </div>

                {/* Submitted Documents */}
                <div>
                    <h4 className="text-xs font-bold text-[#005461] mb-2.5">
                        Submitted Documents
                    </h4>

                    <div className="space-y-2">
                        {application.documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center justify-between p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 hover:bg-[#E2EFF1]/50 transition-colors"
                            >
                                <div className="flex items-center gap-2.5">
                                    <FileText className="w-4 h-4 text-[#005461]" />
                                    <span className="text-xs font-bold text-[#005461]">
                                        {doc.name}
                                    </span>
                                </div>

                                <button
                                    onClick={() => onViewDocument(doc)}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-[#005461]/15 hover:bg-[#005461] hover:text-white text-[#005461] text-xs font-bold transition-colors cursor-pointer"
                                >
                                    <Eye className="w-3 h-3" />
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notes Input */}
                <div>
                    <label className="block text-xs font-bold text-[#005461] mb-1.5">
                        Verification Notes
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Verification notes (optional)…"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-2 focus:ring-[#005461]/20 resize-none"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#005461]/10 flex items-center justify-end gap-3">
                <button
                    onClick={handleReject}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-600 hover:text-white text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                >
                    <XCircle className="w-4 h-4" />
                    Reject
                </button>

                <button
                    onClick={handleApprove}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve & Verify
                </button>
            </div>
        </div>
    );
}
