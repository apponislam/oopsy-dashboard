"use client";

import { useState } from "react";
import { PayoutRecord, PayoutStats } from "./types";
import { PayoutsHeader } from "./PayoutsHeader";
import { PayoutsStatsCards } from "./PayoutsStatsCards";
import { PayoutsTable } from "./PayoutsTable";
import { PayoutDetailsModal } from "./PayoutDetailsModal";

const initialPayouts: PayoutRecord[] = [
    {
        id: "#PO-241",
        provider: "CleanSpace Ltd",
        amount: "£7,848",
        period: "Aug 2026",
        bank: "Barclays ••4521",
        status: "Scheduled",
    },
    {
        id: "#PO-240",
        provider: "Refresh Hub",
        amount: "£4,320",
        period: "Aug 2026",
        bank: "HSBC ••8832",
        status: "Processing",
    },
    {
        id: "#PO-239",
        provider: "SecureBox",
        amount: "£9,600",
        period: "Aug 2026",
        bank: "Natwest ••2210",
        status: "Completed",
    },
    {
        id: "#PO-238",
        provider: "ZenSpa London",
        amount: "£1,080",
        period: "Aug 2026",
        bank: "Lloyds ••9987",
        status: "On Hold",
    },
];

const globalStats: PayoutStats = {
    totalPayable: "£22,848",
    processing: "£4,320",
    completed: "£158,400",
    onHold: "£1,080",
};

export function PayoutsManagement() {
    const [payouts, setPayouts] = useState<PayoutRecord[]>(initialPayouts);
    const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);
    const [selectedPayout, setSelectedPayout] = useState<PayoutRecord | null>(null);

    // Process all scheduled payouts
    const handleProcessAllScheduled = () => {
        setPayouts((prev) =>
            prev.map((p) => (p.status === "Scheduled" ? { ...p, status: "Processing" } : p))
        );
    };

    // Release or review action on individual payout
    const handleActionClick = (payout: PayoutRecord, action: "Release" | "Review") => {
        if (action === "Release") {
            setPayouts((prev) =>
                prev.map((p) => (p.id === payout.id ? { ...p, status: "Processing" } : p))
            );
        } else if (action === "Review") {
            setSelectedPayout(payout);
        }
    };

    // Filter table by stat card click
    const filteredPayouts = payouts.filter((p) => {
        if (!activeStatFilter) return true;
        return p.status === activeStatFilter;
    });

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <PayoutsHeader onProcessAllScheduled={handleProcessAllScheduled} />

            {/* Summary Stat Cards */}
            <PayoutsStatsCards
                stats={globalStats}
                activeStatFilter={activeStatFilter}
                onSelectStatFilter={setActiveStatFilter}
            />

            {/* Table */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs">
                <PayoutsTable
                    payouts={filteredPayouts}
                    onViewDetails={(payout) => setSelectedPayout(payout)}
                    onActionClick={handleActionClick}
                />
            </div>

            {/* Details Modal */}
            <PayoutDetailsModal
                payout={selectedPayout}
                onClose={() => setSelectedPayout(null)}
            />
        </div>
    );
}
