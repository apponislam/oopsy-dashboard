"use client";

import React, { useEffect } from "react";
import { AlertTriangle, CheckCircle2, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    description: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "success" | "warning";
    isLoading?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

export function ConfirmModal({ isOpen, title, description, confirmText = "Confirm", cancelText = "Cancel", variant = "danger", isLoading = false, onConfirm, onClose }: ConfirmModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen && !isLoading) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isLoading, onClose]);

    if (!isOpen) return null;

    const isDanger = variant === "danger";

    return (
        <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => {
                if (!isLoading) onClose();
            }}
        >
            <div className="bg-white rounded-2xl border border-[#005461]/15 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                {/* Header with close button */}
                <div className="p-5 pb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl shrink-0 shadow-2xs", isDanger ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100")}>
                            {isDanger ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#005461] leading-tight">{title}</h3>
                        </div>
                    </div>

                    <button type="button" onClick={onClose} disabled={isLoading} className="h-8 w-8 rounded-lg bg-gray-50 hover:bg-gray-100 text-[#005461]/60 hover:text-[#005461] flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 border border-[#005461]/10">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Description Body */}
                <div className="px-5 py-3 text-xs leading-relaxed text-[#005461]/80">{description}</div>

                {/* Footer Buttons */}
                <div className="p-4 bg-[#f0f9fa]/70 border-t border-[#005461]/10 flex items-center justify-end gap-2.5">
                    <button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 rounded-xl bg-white hover:bg-gray-100 text-[#005461] font-semibold text-xs border border-[#005461]/20 transition-colors cursor-pointer disabled:opacity-50 shadow-2xs">
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={cn("inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-60", isDanger ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700")}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
