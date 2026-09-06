"use client";

import { useState } from "react";
import { ReportItem } from "./types";
import { ReportsHeader } from "./ReportsHeader";
import { ReportsTable } from "./ReportsTable";
import { ReportInvestigateModal } from "./ReportInvestigateModal";

const initialReports: ReportItem[] = [
    {
        id: "#C-142",
        reportedBy: "James Wilson",
        against: "CleanSpace Soho",
        type: "Facility Condition",
        severity: "High",
        date: "24 Aug",
        status: "Open",
    },
    {
        id: "#C-141",
        reportedBy: "Emma Johnson",
        against: "Oliver Brown",
        type: "Inappropriate Behaviour",
        severity: "Medium",
        date: "23 Aug",
        status: "Investigating",
    },
    {
        id: "#C-140",
        reportedBy: "Priya Mehta",
        against: "Refresh Hub",
        type: "Billing Dispute",
        severity: "Medium",
        date: "22 Aug",
        status: "Open",
    },
    {
        id: "#C-139",
        reportedBy: "Tom Harris",
        against: "ZenSpa Soho",
        type: "Safety Concern",
        severity: "Critical",
        date: "21 Aug",
        status: "Resolved",
    },
];

export function ReportsManagement() {
    const [reports, setReports] = useState<ReportItem[]>(initialReports);
    const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

    const handleCloseReport = (reportId: string) => {
        setReports((prev) =>
            prev.map((r) => (r.id === reportId ? { ...r, status: "Closed" } : r))
        );
    };

    const handleResolve = (reportId: string) => {
        setReports((prev) =>
            prev.map((r) => (r.id === reportId ? { ...r, status: "Resolved" } : r))
        );
    };

    const handleMarkInvestigating = (reportId: string) => {
        setReports((prev) =>
            prev.map((r) => (r.id === reportId ? { ...r, status: "Investigating" } : r))
        );
        setSelectedReport((prev) => (prev ? { ...prev, status: "Investigating" } : null));
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <ReportsHeader />

            {/* Table Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs">
                <ReportsTable
                    reports={reports}
                    onInvestigate={(report) => setSelectedReport(report)}
                    onCloseReport={handleCloseReport}
                />
            </div>

            {/* Investigate Modal */}
            <ReportInvestigateModal
                report={selectedReport}
                onClose={() => setSelectedReport(null)}
                onResolve={handleResolve}
                onMarkInvestigating={handleMarkInvestigating}
            />
        </div>
    );
}
