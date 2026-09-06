"use client";

import { SearchCheck, CheckCircle2, ShieldAlert } from "lucide-react";
import { ReportItem } from "./types";

interface ReportsTableProps {
    reports: ReportItem[];
    onInvestigate: (report: ReportItem) => void;
    onCloseReport: (reportId: string) => void;
}

export function ReportsTable({
    reports,
    onInvestigate,
    onCloseReport,
}: ReportsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3 px-3">Reported By</th>
                        <th className="py-3 px-3">Against</th>
                        <th className="py-3 px-3">Type</th>
                        <th className="py-3 px-3">Severity</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                    {reports.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="py-8 text-center text-[#005461]/50 font-semibold">
                                No reports found.
                            </td>
                        </tr>
                    ) : (
                        reports.map((item) => (
                            <tr key={item.id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                <td className="py-3.5 px-3 font-mono font-bold text-[#005461]/70">
                                    {item.id}
                                </td>
                                <td className="py-3.5 px-3 font-bold text-[#005461]">{item.reportedBy}</td>
                                <td className="py-3.5 px-3 text-[#005461]/80">{item.against}</td>
                                <td className="py-3.5 px-3">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#005461]/10 text-[#005461]">
                                        {item.type}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            item.severity === "Critical"
                                                ? "bg-rose-100 text-rose-800 border border-rose-300 animate-pulse"
                                                : item.severity === "High"
                                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                                : item.severity === "Medium"
                                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                : "bg-sky-50 text-sky-700 border border-sky-200"
                                        }`}
                                    >
                                        {item.severity}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-[#005461]/70">{item.date}</td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            item.status === "Open"
                                                ? "bg-[#088395]/15 text-[#005461] border border-[#088395]/30"
                                                : item.status === "Investigating"
                                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                : item.status === "Resolved"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                : "bg-slate-100 text-slate-600 border border-slate-200"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onInvestigate(item)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E2EFF1] hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-[11px] transition-colors cursor-pointer"
                                        >
                                            <SearchCheck className="w-3 h-3" />
                                            Investigate
                                        </button>

                                        {item.status !== "Closed" && (
                                            <button
                                                onClick={() => onCloseReport(item.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-700 hover:text-white text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                                            >
                                                <CheckCircle2 className="w-3 h-3" />
                                                Close
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
