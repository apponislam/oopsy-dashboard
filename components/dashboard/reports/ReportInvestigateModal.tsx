"use client";

import { useState } from "react";
import { X, ShieldAlert, User, AlertOctagon, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";
import { ReportItem } from "./types";

interface ReportInvestigateModalProps {
    report: ReportItem | null;
    onClose: () => void;
    onResolve: (reportId: string, resolutionNotes: string) => void;
    onMarkInvestigating: (reportId: string) => void;
}

export function ReportInvestigateModal({
    report,
    onClose,
    onResolve,
    onMarkInvestigating,
}: ReportInvestigateModalProps) {
    const [notes, setNotes] = useState("");

    if (!report) return null;

    const handleResolve = () => {
        onResolve(report.id, notes);
        setNotes("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-rose-100 text-rose-700 font-extrabold flex items-center justify-center text-sm shadow-xs">
                            <ShieldAlert className="w-5 h-5 text-rose-700" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#005461]">Investigate Case</h3>
                            <span className="text-xs text-[#005461]/60 font-mono font-semibold">
                                {report.id}
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

                {/* Content */}
                <div className="p-6 space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <User className="w-3 h-3 text-[#005461]" /> Reported By
                            </span>
                            <span className="font-bold text-[#005461]">{report.reportedBy}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <AlertOctagon className="w-3 h-3 text-[#005461]" /> Against
                            </span>
                            <span className="font-bold text-[#005461]">{report.against}</span>
                        </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70">Complaint Category</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#005461]/10 text-[#005461]">
                            {report.type}
                        </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70">Severity Level</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                                report.severity === "Critical"
                                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                                    : report.severity === "High"
                                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                                    : report.severity === "Medium"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-sky-50 text-sky-700 border border-sky-200"
                            }`}
                        >
                            {report.severity}
                        </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#005461]" /> Date Logged
                        </span>
                        <span className="font-bold text-[#005461]">{report.date}</span>
                    </div>

                    {/* Resolution Notes Input */}
                    <div>
                        <label className="block text-xs font-bold text-[#005461] mb-1.5">
                            Investigation Notes & Findings
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Add case findings and resolution steps…"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full p-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-2 focus:ring-[#005461]/20 resize-none"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-[#f0f9fa] border-t border-[#005461]/10 flex items-center justify-between gap-3">
                    {report.status === "Open" && (
                        <button
                            onClick={() => onMarkInvestigating(report.id)}
                            className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                            Set Investigating
                        </button>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            onClick={handleResolve}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            Resolve Case
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
        </div>
    );
}
