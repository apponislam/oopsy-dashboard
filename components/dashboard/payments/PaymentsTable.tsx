"use client";

import { Eye, CreditCard } from "lucide-react";
import { PaymentTransaction } from "./types";

interface PaymentsTableProps {
    transactions: PaymentTransaction[];
    onViewDetails: (txn: PaymentTransaction) => void;
}

export function PaymentsTable({ transactions, onViewDetails }: PaymentsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">Txn ID</th>
                        <th className="py-3 px-3">From</th>
                        <th className="py-3 px-3">To</th>
                        <th className="py-3 px-3">Amount</th>
                        <th className="py-3 px-3">Fee</th>
                        <th className="py-3 px-3">Net</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Method</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="py-8 text-center text-[#005461]/50 font-semibold">
                                No transactions found.
                            </td>
                        </tr>
                    ) : (
                        transactions.map((txn) => (
                            <tr key={txn.id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                <td className="py-3.5 px-3 font-mono font-bold text-[#005461]/70">
                                    {txn.id}
                                </td>
                                <td className="py-3.5 px-3 font-bold text-[#005461]">{txn.from}</td>
                                <td className="py-3.5 px-3 text-[#005461]/80">{txn.to}</td>
                                <td className="py-3.5 px-3 font-bold">{txn.amount}</td>
                                <td className="py-3.5 px-3 text-rose-600 font-semibold">{txn.fee}</td>
                                <td className="py-3.5 px-3 font-extrabold text-[#005461]">{txn.net}</td>
                                <td className="py-3.5 px-3 text-[#005461]/70">{txn.date}</td>
                                <td className="py-3.5 px-3">
                                    <span className="inline-flex items-center gap-1 font-semibold text-[#005461]/80">
                                        <CreditCard className="w-3.5 h-3.5 text-[#005461]/50" />
                                        {txn.method}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            txn.status === "Settled"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                : txn.status === "Refunded"
                                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                : "bg-rose-50 text-rose-700 border border-rose-200"
                                        }`}
                                    >
                                        {txn.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-right">
                                    <button
                                        onClick={() => onViewDetails(txn)}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#E2EFF1] hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-[11px] transition-colors cursor-pointer"
                                    >
                                        <Eye className="w-3 h-3" />
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
