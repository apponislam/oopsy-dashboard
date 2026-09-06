"use client";

import { X, FileText, Download, CheckCircle2 } from "lucide-react";
import { SubmittedDocument } from "./types";

interface DocumentPreviewModalProps {
    document: SubmittedDocument | null;
    onClose: () => void;
}

export function DocumentPreviewModal({
    document,
    onClose,
}: DocumentPreviewModalProps) {
    if (!document) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-md w-full overflow-hidden">
                {/* Modal Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-[#005461] text-white flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#005461]">{document.name}</h3>
                            <span className="text-xs text-[#005461]/60 font-medium">
                                {document.fileName}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg bg-white/80 hover:bg-white text-[#005461] flex items-center justify-center transition-colors cursor-pointer border border-[#005461]/10"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-4 text-xs">
                    <div className="p-8 rounded-xl bg-[#f0f9fa] border border-dashed border-[#005461]/20 flex flex-col items-center justify-center text-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#005461] text-sm">{document.fileName}</h4>
                            <p className="text-xs text-[#005461]/60 mt-0.5">
                                Verified Upload · {document.fileSize} · {document.uploadDate}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60">Doc Type</span>
                            <p className="font-bold text-[#005461] mt-0.5">{document.type}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60">Doc ID</span>
                            <p className="font-bold text-[#005461] mt-0.5">{document.id}</p>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-[#f0f9fa] border-t border-[#005461]/10 flex items-center justify-between">
                    <button
                        onClick={() => alert(`Downloading ${document.fileName}...`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Download
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-white border border-[#005461]/20 hover:bg-[#E2EFF1] text-[#005461] text-xs font-bold transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
