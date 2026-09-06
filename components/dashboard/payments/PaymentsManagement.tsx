"use client";

import { useState } from "react";
import { PaymentTransaction, PaymentStats } from "./types";
import { PaymentsHeader } from "./PaymentsHeader";
import { PaymentsStatsCards } from "./PaymentsStatsCards";
import { PaymentsTable } from "./PaymentsTable";
import { PaymentDetailsModal } from "./PaymentDetailsModal";

const initialTransactions: PaymentTransaction[] = [
    {
        id: "#T-4821",
        from: "Sarah Chen",
        to: "CleanSpace Ltd",
        amount: "£8.00",
        fee: "−£0.80",
        net: "£7.20",
        date: "24 Aug",
        method: "Visa ••4214",
        status: "Settled",
    },
    {
        id: "#T-4820",
        from: "James Wilson",
        to: "Refresh Hub",
        amount: "£12.00",
        fee: "−£1.20",
        net: "£10.80",
        date: "24 Aug",
        method: "Apple Pay",
        status: "Settled",
    },
    {
        id: "#T-4819",
        from: "Emma Johnson",
        to: "ZenSpa London",
        amount: "£25.00",
        fee: "−£2.50",
        net: "£22.50",
        date: "23 Aug",
        method: "Visa ••9321",
        status: "Refunded",
    },
    {
        id: "#T-4817",
        from: "Lily Wang",
        to: "CleanSpace Ltd",
        amount: "£8.00",
        fee: "−£0.80",
        net: "£7.20",
        date: "22 Aug",
        method: "Visa ••8876",
        status: "Disputed",
    },
];

const globalStats: PaymentStats = {
    volume: "£182,430",
    revenue: "£18,243",
    refunds: "£1,240",
    disputes: 4,
};

export function PaymentsManagement() {
    const [transactions] = useState<PaymentTransaction[]>(initialTransactions);
    const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);
    const [selectedTxn, setSelectedTxn] = useState<PaymentTransaction | null>(null);

    // Filter table by stat card click
    const filteredTxns = transactions.filter((t) => {
        if (!activeStatFilter || activeStatFilter === "Volume" || activeStatFilter === "Revenue") return true;
        if (activeStatFilter === "Refunds") return t.status === "Refunded";
        if (activeStatFilter === "Disputes") return t.status === "Disputed";
        return true;
    });

    const handleDownloadReport = () => {
        const headers = ["Txn ID", "From", "To", "Amount", "Fee", "Net", "Date", "Method", "Status"];
        const rows = transactions.map((t) => [t.id, t.from, t.to, t.amount, t.fee, t.net, t.date, t.method, t.status]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `payment_report_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <PaymentsHeader onDownloadReport={handleDownloadReport} />

            {/* Summary Stat Cards */}
            <PaymentsStatsCards
                stats={globalStats}
                activeStatFilter={activeStatFilter}
                onSelectStatFilter={setActiveStatFilter}
            />

            {/* Table */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs">
                <PaymentsTable
                    transactions={filteredTxns}
                    onViewDetails={(txn) => setSelectedTxn(txn)}
                />
            </div>

            {/* Transaction Details Modal */}
            <PaymentDetailsModal
                transaction={selectedTxn}
                onClose={() => setSelectedTxn(null)}
            />
        </div>
    );
}
