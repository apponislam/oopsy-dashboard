"use client";

import { useState } from "react";
import { Booking, BookingStats } from "./types";
import { BookingsHeader } from "./BookingsHeader";
import { BookingsStatsCards } from "./BookingsStatsCards";
import { BookingsTable } from "./BookingsTable";
import { BookingDetailsModal } from "./BookingDetailsModal";

const initialBookings: Booking[] = [
    {
        id: "#B-0921",
        client: "Sarah Chen",
        facility: "CleanSpace Soho",
        dateTime: "24 Aug, 14:30",
        amount: "£8",
        status: "Confirmed",
    },
    {
        id: "#B-0920",
        client: "James Wilson",
        facility: "Refresh Point W1",
        dateTime: "24 Aug, 10:00",
        amount: "£12",
        status: "Completed",
    },
    {
        id: "#B-0919",
        client: "Emma Johnson",
        facility: "ZenSpa Soho",
        dateTime: "23 Aug, 16:00",
        amount: "£25",
        status: "Cancelled",
    },
    {
        id: "#B-0918",
        client: "Oliver Brown",
        facility: "SecureBox Carnaby",
        dateTime: "23 Aug, 09:15",
        amount: "£4",
        status: "Completed",
    },
    {
        id: "#B-0917",
        client: "Lily Wang",
        facility: "CleanSpace Soho",
        dateTime: "22 Aug, 11:30",
        amount: "£8",
        status: "Disputed",
    },
];

const globalStats: BookingStats = {
    today: 284,
    confirmed: 198,
    completed: 72,
    disputed: 4,
};

export function BookingsManagement() {
    const [bookings] = useState<Booking[]>(initialBookings);
    const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    // Filter table by stat card click
    const filteredBookings = bookings.filter((b) => {
        if (!activeStatFilter || activeStatFilter === "Today") return true;
        return b.status === activeStatFilter;
    });

    const handleExportCSV = () => {
        const headers = ["Booking ID", "Client", "Facility", "Date & Time", "Amount", "Status"];
        const rows = bookings.map((b) => [b.id, b.client, b.facility, b.dateTime, b.amount, b.status]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `bookings_export_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <BookingsHeader onExport={handleExportCSV} />

            {/* Stats Cards */}
            <BookingsStatsCards
                stats={globalStats}
                activeStatFilter={activeStatFilter}
                onSelectStatFilter={setActiveStatFilter}
            />

            {/* Table */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs">
                <BookingsTable
                    bookings={filteredBookings}
                    onViewDetails={(booking) => setSelectedBooking(booking)}
                />
            </div>

            {/* Booking Details Modal */}
            <BookingDetailsModal
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
            />
        </div>
    );
}
