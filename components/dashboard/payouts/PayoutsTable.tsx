"use client";

import { Eye, ArrowUpRight, ShieldAlert, Building } from "lucide-react";
import { PayoutRecord } from "./types";

interface PayoutsTableProps {
    payouts: PayoutRecord[];
    onViewDetails: (payout: PayoutRecord) => void;
    onActionClick: (payout: PayoutRecord, action: "Release" | "Review") => void;
}

export function PayoutsTable({
    payouts,
    onViewDetails,
    onActionClick,
}: PayoutsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3 px-3">Provider</th>
                        <th className="py-3 px-3">Amount</th>
                        <th className="py-3 px-3">Period</th>
                        <th className="py-3 px-3">Bank</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                    {payouts.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="py-8 text-center text-[#005461]/50 font-semibold">
                                No payouts found matching filter.
                            </td>
                        </tr>
                    ) : (
                        payouts.map((payout) => (
                            <tr key={payout.id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                <td className="py-3.5 px-3 font-mono font-bold text-[#005461]/70">
                                    {payout.id}
                                </td>
                                <td className="py-3.5 px-3 font-bold text-[#005461]">{payout.provider}</td>
                                <td className="py-3.5 px-3 font-extrabold text-[#005461]">{payout.amount}</td>
                                <td className="py-3.5 px-3 text-[#005461]/70">{payout.period}</td>
                                <td className="py-3.5 px-3">
                                    <span className="inline-flex items-center gap-1 font-semibold text-[#005461]/80">
                                        <Building className="w-3.5 h-3.5 text-[#005461]/50" />
                                        {payout.bank}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            payout.status === "Scheduled"
                                                ? "bg-[#005461]/10 text-[#005461] border border-[#005461]/20"
                                                : payout.status === "Processing"
                                                ? "bg-sky-50 text-sky-700 border border-sky-200"
                                                : payout.status === "Completed"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                : "bg-rose-50 text-rose-700 border border-rose-200 animate-pulse"
                                        }`}
                                    >
                                        {payout.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {payout.status === "Scheduled" && (
                                            <button
                                                onClick={() => onActionClick(payout, "Release")}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#005461] hover:bg-[#005461]/90 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                                            >
                                                <ArrowUpRight className="w-3 h-3" />
                                                Release
                                            </button>
                                        )}

                                        {payout.status === "On Hold" && (
                                            <button
                                                onClick={() => onActionClick(payout, "Review")}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 font-bold text-[11px] transition-colors cursor-pointer border border-rose-200"
                                            >
                                                <ShieldAlert className="w-3 h-3" />
                                                Review
                                            </button>
                                        )}

                                        <button
                                            onClick={() => onViewDetails(payout)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E2EFF1] hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-[11px] transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-3 h-3" />
                                            Details
                                        </button>
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
