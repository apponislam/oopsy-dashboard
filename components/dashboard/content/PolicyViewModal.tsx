"use client";

import React from "react";
import { IPolicy } from "@/redux/features/public/publicApi";
import { Button } from "@/components/ui/button";
import { X, ShieldCheck, Calendar, Edit2 } from "lucide-react";

interface PolicyViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    policy: IPolicy | null;
    defaultTitle: string;
    onEdit: () => void;
}

export function PolicyViewModal({
    isOpen,
    onClose,
    policy,
    defaultTitle,
    onEdit,
}: PolicyViewModalProps) {
    if (!isOpen) return null;

    const formattedDate = policy?.updatedAt || policy?.publishedAt
        ? new Date(policy.updatedAt || policy.publishedAt || "").toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "Not published yet";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
            <div
                className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-gray-100 space-y-5 relative max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="space-y-1.5 pr-8">
                    <div className="flex items-center gap-2 text-[#088395] text-xs font-semibold uppercase tracking-wider">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Policy Document</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                        {policy?.title || defaultTitle}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {formattedDate}
                        </span>
                        {policy?.type && (
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-mono">
                                {policy.type}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 border-t border-b border-gray-100 py-4 my-2">
                    {policy?.content ? (
                        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
                            {policy.content}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400 text-sm">
                            No content has been added to this policy yet. Click &ldquo;Edit Document&rdquo; to add content.
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="rounded-xl cursor-pointer"
                    >
                        Close
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {
                            onClose();
                            onEdit();
                        }}
                        className="bg-[#005461] hover:bg-[#00424d] text-white rounded-xl gap-2 cursor-pointer"
                    >
                        <Edit2 className="h-4 w-4" />
                        Edit Document
                    </Button>
                </div>
            </div>
        </div>
    );
}

