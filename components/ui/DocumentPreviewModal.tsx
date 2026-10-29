"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Download, FileText, ImageIcon, Eye } from "lucide-react";
import { isPdfFile, isImageFile } from "@/utils/imageUrl";

export interface DocumentPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    url?: string | null;
}

export function DocumentPreviewModal({ isOpen, onClose, title, url }: DocumentPreviewModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !url) return null;

    const isPdf = isPdfFile(url);
    const isImg = isImageFile(url);
    const fileName = url.split("/").pop() || "document";

    return (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="p-4 sm:p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">{isPdf ? <FileText className="w-5 h-5" /> : isImg ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}</div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-[#005461] truncate">{title}</h3>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#005461]/10 text-[#005461] shrink-0">{isPdf ? "PDF Document" : isImg ? "Image File" : "Document"}</span>
                            </div>
                            <p className="text-xs text-[#005461]/60 font-mono truncate">{fileName}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#005461]/20 hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-xs transition-colors shadow-2xs"
                            title="Open in new window"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Open in Tab</span>
                        </a>

                        <a href={url} download={fileName} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#005461]/20 hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-xs transition-colors shadow-2xs" title="Download file">
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Download</span>
                        </a>

                        <button type="button" onClick={onClose} className="h-8 w-8 rounded-lg bg-white hover:bg-gray-100 text-[#005461] flex items-center justify-center transition-colors cursor-pointer border border-[#005461]/15" aria-label="Close preview">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Modal Preview Body */}
                <div className="relative flex-1 bg-slate-900/5 min-h-100 overflow-hidden flex items-center justify-center">
                    {isPdf ? (
                        <iframe src={url} className="w-full h-[70vh] border-0 bg-white" title={title} />
                    ) : isImg ? (
                        <div className="p-4 max-h-[75vh] overflow-auto flex items-center justify-center w-full">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt={title} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-sm" />
                        </div>
                    ) : (
                        <iframe src={url} className="w-full h-[70vh] border-0 bg-white" title={title} />
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-3.5 bg-[#f0f9fa] border-t border-[#005461]/10 flex items-center justify-between text-xs text-[#005461]/70">
                    <span className="truncate max-w-md hidden sm:inline">{url}</span>
                    <button type="button" onClick={onClose} className="ml-auto px-4 py-1.5 rounded-xl bg-[#005461] text-white font-bold text-xs hover:bg-[#00424d] transition-colors cursor-pointer shadow-2xs">
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DocumentPreviewModal;
