"use client";

import { useState } from "react";
import { AssistanceTicket } from "./types";
import { AssistanceHeader } from "./AssistanceHeader";
import { AssistanceTable } from "./AssistanceTable";
import { AssistanceRespondModal } from "./AssistanceRespondModal";

const initialTickets: AssistanceTicket[] = [
    {
        id: "#A-089",
        user: "Sarah Chen",
        topic: "Booking Issue",
        message: "Unable to cancel my booking.",
        submitted: "24 Aug, 14:22",
        priority: "Normal",
        status: "Open",
    },
    {
        id: "#A-088",
        user: "James Wilson",
        topic: "Payment Problem",
        message: "Was charged twice for booking.",
        submitted: "24 Aug, 11:05",
        priority: "High",
        status: "In Progress",
    },
    {
        id: "#A-087",
        user: "Emma Johnson",
        topic: "Accessibility",
        message: "Facility not accessible as listed.",
        submitted: "23 Aug, 18:40",
        priority: "High",
        status: "Resolved",
    },
    {
        id: "#A-086",
        user: "Oliver Brown",
        topic: "Other",
        message: "Cannot find nearby facilities.",
        submitted: "22 Aug, 09:10",
        priority: "Normal",
        status: "Resolved",
    },
];

export function AssistanceManagement() {
    const [tickets, setTickets] = useState<AssistanceTicket[]>(initialTickets);
    const [selectedTicket, setSelectedTicket] = useState<AssistanceTicket | null>(null);

    const handleCloseTicket = (ticketId: string) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === ticketId ? { ...t, status: "Closed" } : t))
        );
    };

    const handleResolve = (ticketId: string) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === ticketId ? { ...t, status: "Resolved" } : t))
        );
    };

    const handleSendResponse = (ticketId: string) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === ticketId ? { ...t, status: "In Progress" } : t))
        );
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <AssistanceHeader />

            {/* Table Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs">
                <AssistanceTable
                    tickets={tickets}
                    onRespond={(ticket) => setSelectedTicket(ticket)}
                    onCloseTicket={handleCloseTicket}
                />
            </div>

            {/* Respond Modal */}
            <AssistanceRespondModal
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
                onSendResponse={handleSendResponse}
                onResolve={handleResolve}
            />
        </div>
    );
}
