"use client";

import React, { useState } from "react";
import { SafetyIncident } from "./types";
import { SafetyHeader } from "./SafetyHeader";
import { SafetyAlertBanner } from "./SafetyAlertBanner";
import { SafetyIncidentCard } from "./SafetyIncidentCard";
import { InvestigateModal } from "./InvestigateModal";
import { ContactProviderModal } from "./ContactProviderModal";

const initialIncidents: SafetyIncident[] = [
    {
        id: "inc-1",
        facility: "Refresh Point W1",
        category: "Security Concern",
        description: "Broken door lock — users unable to secure facility.",
        severity: "Critical",
        status: "Investigating",
        reportedDate: "2026-09-06 10:15 AM",
    },
    {
        id: "inc-2",
        facility: "CleanSpace Soho",
        category: "Safety Hazard",
        description: "Slippery floor with no warning sign reported.",
        severity: "High",
        status: "Open",
        reportedDate: "2026-09-06 11:30 AM",
    },
];

export function SafetyManagement() {
    const [incidents, setIncidents] = useState<SafetyIncident[]>(initialIncidents);
    const [selectedInvestigate, setSelectedInvestigate] = useState<SafetyIncident | null>(null);
    const [selectedContact, setSelectedContact] = useState<SafetyIncident | null>(null);

    const activeCount = incidents.filter((i) => i.status !== "Resolved").length;
    const criticalIncident = incidents.find((i) => i.severity === "Critical");
    const highlightText = criticalIncident
        ? `1 critical — ${criticalIncident.facility} door lock needs immediate attention.`
        : `${activeCount} safety incidents require review and action.`;

    const handleDownloadReport = () => {
        alert("Downloading Safety Incidents Report (PDF/CSV)...");
    };

    const handleSaveNotes = (incidentId: string, notes: string) => {
        setIncidents((prev) =>
            prev.map((item) =>
                item.id === incidentId
                    ? { ...item, status: "Investigating" as const }
                    : item
            )
        );
        alert(`Investigation notes saved for incident ${incidentId}`);
    };

    const handleSendMessage = (incidentId: string, subject: string, message: string) => {
        alert(`Urgent notice sent to provider for incident ${incidentId}`);
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            <SafetyHeader onDownloadReport={handleDownloadReport} />

            <SafetyAlertBanner
                activeCount={activeCount}
                highlightText={highlightText}
            />

            <div className="space-y-4 pt-2">
                <h2 className="text-lg font-bold text-gray-900">Incident Logs</h2>
                <div className="grid gap-4">
                    {incidents.map((incident) => (
                        <SafetyIncidentCard
                            key={incident.id}
                            incident={incident}
                            onInvestigate={(inc) => setSelectedInvestigate(inc)}
                            onContactProvider={(inc) => setSelectedContact(inc)}
                        />
                    ))}
                </div>
            </div>

            <InvestigateModal
                incident={selectedInvestigate}
                isOpen={!!selectedInvestigate}
                onClose={() => setSelectedInvestigate(null)}
                onSaveNotes={handleSaveNotes}
            />

            <ContactProviderModal
                incident={selectedContact}
                isOpen={!!selectedContact}
                onClose={() => setSelectedContact(null)}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
}
