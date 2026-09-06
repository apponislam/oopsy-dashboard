"use client";

import { useState } from "react";
import { VerificationApplication, SubmittedDocument } from "./types";
import { VerificationHeader } from "./VerificationHeader";
import { VerificationList } from "./VerificationList";
import { VerificationDetail } from "./VerificationDetail";
import { DocumentPreviewModal } from "./DocumentPreviewModal";

const initialApplications: VerificationApplication[] = [
    {
        id: "1",
        appId: "V-008",
        business: "ZenSpa London",
        owner: "Alice Park",
        type: "Spa",
        isUrgent: false,
        submittedDate: "24 Aug 2026",
        status: "Pending",
        documents: [
            {
                id: "DOC-101",
                name: "Business Reg",
                type: "Certificate",
                fileName: "zenspa_registration.pdf",
                fileSize: "2.4 MB",
                uploadDate: "24 Aug 2026",
            },
            {
                id: "DOC-102",
                name: "Insurance",
                type: "Policy Document",
                fileName: "zenspa_insurance_policy.pdf",
                fileSize: "1.8 MB",
                uploadDate: "24 Aug 2026",
            },
            {
                id: "DOC-103",
                name: "ID",
                type: "Government ID",
                fileName: "alice_park_passport.pdf",
                fileSize: "3.1 MB",
                uploadDate: "24 Aug 2026",
            },
        ],
    },
    {
        id: "2",
        appId: "V-009",
        business: "FreshZone Midlands",
        owner: "Priya Mehta",
        type: "Restroom",
        isUrgent: true,
        submittedDate: "24 Aug 2026",
        status: "Pending",
        documents: [
            {
                id: "DOC-201",
                name: "Business Reg",
                type: "Certificate",
                fileName: "freshzone_reg.pdf",
                fileSize: "1.9 MB",
                uploadDate: "24 Aug 2026",
            },
            {
                id: "DOC-202",
                name: "Insurance",
                type: "Policy Document",
                fileName: "freshzone_liability.pdf",
                fileSize: "2.1 MB",
                uploadDate: "24 Aug 2026",
            },
            {
                id: "DOC-203",
                name: "ID",
                type: "Government ID",
                fileName: "priya_mehta_id.pdf",
                fileSize: "2.8 MB",
                uploadDate: "24 Aug 2026",
            },
        ],
    },
    {
        id: "3",
        appId: "V-010",
        business: "AquaRelax Bath",
        owner: "Tom Riley",
        type: "Hot Tub",
        isUrgent: false,
        submittedDate: "23 Aug 2026",
        status: "Pending",
        documents: [
            {
                id: "DOC-301",
                name: "Business Reg",
                type: "Certificate",
                fileName: "aquarelax_cert.pdf",
                fileSize: "2.0 MB",
                uploadDate: "23 Aug 2026",
            },
            {
                id: "DOC-302",
                name: "Insurance",
                type: "Policy Document",
                fileName: "aquarelax_insurance.pdf",
                fileSize: "1.5 MB",
                uploadDate: "23 Aug 2026",
            },
            {
                id: "DOC-303",
                name: "ID",
                type: "Government ID",
                fileName: "tom_riley_license.pdf",
                fileSize: "2.2 MB",
                uploadDate: "23 Aug 2026",
            },
        ],
    },
    {
        id: "4",
        appId: "V-011",
        business: "City Showers Ltd",
        owner: "Daniel Obi",
        type: "Shower",
        isUrgent: true,
        submittedDate: "23 Aug 2026",
        status: "Pending",
        documents: [
            {
                id: "DOC-401",
                name: "Business Reg",
                type: "Certificate",
                fileName: "cityshowers_reg.pdf",
                fileSize: "3.0 MB",
                uploadDate: "23 Aug 2026",
            },
            {
                id: "DOC-402",
                name: "Insurance",
                type: "Policy Document",
                fileName: "cityshowers_policy.pdf",
                fileSize: "2.7 MB",
                uploadDate: "23 Aug 2026",
            },
            {
                id: "DOC-403",
                name: "ID",
                type: "Government ID",
                fileName: "daniel_obi_passport.pdf",
                fileSize: "3.5 MB",
                uploadDate: "23 Aug 2026",
            },
        ],
    },
];

export function VerificationManagement() {
    const [applications, setApplications] = useState<VerificationApplication[]>(initialApplications);
    const [selectedId, setSelectedId] = useState<string | null>("1");
    const [previewDoc, setPreviewDoc] = useState<SubmittedDocument | null>(null);

    const selectedApp = applications.find((app) => app.id === selectedId) || null;

    const handleApprove = (appId: string) => {
        setApplications((prev) =>
            prev.map((app) => (app.id === appId ? { ...app, status: "Approved" } : app))
        );
        const remaining = applications.filter((app) => app.id !== appId && app.status === "Pending");
        setSelectedId(remaining.length > 0 ? remaining[0].id : null);
    };

    const handleReject = (appId: string) => {
        setApplications((prev) =>
            prev.map((app) => (app.id === appId ? { ...app, status: "Rejected" } : app))
        );
        const remaining = applications.filter((app) => app.id !== appId && app.status === "Pending");
        setSelectedId(remaining.length > 0 ? remaining[0].id : null);
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <VerificationHeader />

            {/* 2 side 50/50 Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Left 50%: Pending List */}
                <VerificationList
                    applications={applications}
                    selectedId={selectedId}
                    onSelect={(app) => setSelectedId(app.id)}
                />

                {/* Right 50%: Review Details */}
                <VerificationDetail
                    application={selectedApp}
                    onViewDocument={(doc) => setPreviewDoc(doc)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            </div>

            {/* Document Preview Modal */}
            <DocumentPreviewModal
                document={previewDoc}
                onClose={() => setPreviewDoc(null)}
            />
        </div>
    );
}
