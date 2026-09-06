"use client";

import { X, CreditCard, DollarSign, User, Building2, Calendar, Tag } from "lucide-react";
import { PaymentTransaction } from "./types";

interface PaymentDetailsModalProps {
    transaction: PaymentTransaction | null;
    onClose: () => void;
}

export function PaymentDetailsModal({ transaction, onClose }: PaymentDetailsModalProps) {
    if (!transaction) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#005461] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#005461]">Transaction Details</h3>
                            <span className="text-xs text-[#005461]/60 font-mono font-semibold">
                                {transaction.id}
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
                                <User className="w-3 h-3 text-[#005461]" /> From (Client)
                            </span>
                            <span className="font-bold text-[#005461]">{transaction.from}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-[#005461]" /> To (Provider)
                            </span>
                            <span className="font-bold text-[#005461]">{transaction.to}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60">Amount</span>
                            <span className="font-bold text-[#005461]">{transaction.amount}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60">Fee</span>
                            <span className="font-bold text-rose-600">{transaction.fee}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60">Net Payout</span>
                            <span className="font-extrabold text-[#005461]">{transaction.net}</span>
                        </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#005461]" /> Date
                        </span>
                        <span className="font-bold text-[#005461]">{transaction.date}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70 flex items-center gap-1">
                            <CreditCard className="w-3.5 h-3.5 text-[#005461]" /> Payment Method
                        </span>
                        <span className="font-bold text-[#005461]">{transaction.method}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70 flex items-center gap-1">
                            <Tag className="w-3.5 h-3.5 text-[#005461]" /> Transaction Status
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                                transaction.status === "Settled"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : transaction.status === "Refunded"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                        >
                            {transaction.status}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-[#f0f9fa] border-t border-[#005461]/10 flex items-center justify-end">
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
