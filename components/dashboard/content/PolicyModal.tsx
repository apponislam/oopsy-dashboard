"use client";

import React, { useState, useEffect } from "react";
import { PolicyTypeEnum } from "@/redux/features/public/publicApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, ShieldCheck, Loader2 } from "lucide-react";

interface PolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
    policyType: PolicyTypeEnum | null;
    defaultTitle: string;
    initialContent: string;
    onSubmit: (data: { type: PolicyTypeEnum; title: string; content: string }) => Promise<boolean>;
    isSubmitting: boolean;
}

export function PolicyModal({
    isOpen,
    onClose,
    policyType,
    defaultTitle,
    initialContent,
    onSubmit,
    isSubmitting,
}: PolicyModalProps) {
    const [title, setTitle] = useState(defaultTitle || "");
    const [content, setContent] = useState(initialContent || "");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTitle(defaultTitle || "");
        setContent(initialContent || "");
        setError(null);
    }, [defaultTitle, initialContent, isOpen]);

    if (!isOpen || !policyType) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle) {
            setError("Document title is required");
            return;
        }
        if (!trimmedContent) {
            setError("Document content is required");
            return;
        }

        const success = await onSubmit({
            type: policyType,
            title: trimmedTitle,
            content: trimmedContent,
        });
        if (success) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
            <div
                className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 space-y-5 relative max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#088395] text-xs font-semibold uppercase tracking-wider">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Policy Document Editor</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Edit {defaultTitle || "Policy"}
                    </h3>
                    <p className="text-xs text-gray-500">
                        Identifier: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[11px]">{policyType}</code>
                    </p>
                </div>

                {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto pr-1">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            Document Title <span className="text-rose-500">*</span>
                        </label>
                        <Input
                            placeholder="e.g. Terms & Conditions"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="rounded-xl"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            Policy Content <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            placeholder="Write or paste the full official legal text and policies here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={12}
                            className="w-full p-3.5 text-sm font-sans border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005461]/20 focus:border-[#005461] transition-all resize-y leading-relaxed"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="rounded-xl cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#005461] hover:bg-[#00424d] text-white rounded-xl gap-2 cursor-pointer"
                        >
                            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                            Save Policy Document
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

