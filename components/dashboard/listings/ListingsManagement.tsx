"use client";

import { useState } from "react";
import { Listing } from "./types";
import { ListingsHeader } from "./ListingsHeader";
import { ListingsFilter, ListingFilterType } from "./ListingsFilter";
import { ListingsTable } from "./ListingsTable";
import { ListingViewModal } from "./ListingViewModal";
import { ListingFormModal } from "./ListingFormModal";

const initialListings: Listing[] = [
    {
        id: "L-001",
        title: "CleanSpace Soho",
        provider: "CleanSpace Ltd",
        type: "Restroom",
        city: "London",
        price: "£8",
        bookings: 82,
        rating: 4.9,
        status: "Live",
    },
    {
        id: "L-002",
        title: "Refresh Point W1",
        provider: "Refresh Hub",
        type: "Shower",
        city: "London",
        price: "£12",
        bookings: 47,
        rating: 4.8,
        status: "Live",
    },
    {
        id: "L-003",
        title: "ZenSpa Soho",
        provider: "ZenSpa London",
        type: "Spa",
        city: "London",
        price: "£25",
        bookings: 12,
        rating: 4.6,
        status: "Review",
    },
    {
        id: "L-004",
        title: "SecureBox Carnaby",
        provider: "SecureBox",
        type: "Locker",
        city: "London",
        price: "£4",
        bookings: 201,
        rating: 4.7,
        status: "Paused",
    },
];

export function ListingsManagement() {
    const [listings, setListings] = useState<Listing[]>(initialListings);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTypeFilter, setActiveTypeFilter] = useState<ListingFilterType>("All Types");
    const [selectedListingForView, setSelectedListingForView] = useState<Listing | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Toggle suspend/restore status
    const toggleSuspend = (listingId: string) => {
        setListings((prev) =>
            prev.map((item) => {
                if (item.id === listingId) {
                    const newStatus = item.status === "Suspended" ? "Live" : "Suspended";
                    return { ...item, status: newStatus };
                }
                return item;
            })
        );

        if (selectedListingForView && selectedListingForView.id === listingId) {
            setSelectedListingForView((prev) =>
                prev ? { ...prev, status: prev.status === "Suspended" ? "Live" : "Suspended" } : null
            );
        }
    };

    const handleSaveListing = (newListing: Listing) => {
        setListings((prev) => [newListing, ...prev]);
    };

    // Filter listings based on search string & 5 type dropdowns
    const filteredListings = listings.filter((item) => {
        const matchesType =
            activeTypeFilter === "All Types" || item.type === activeTypeFilter;
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <ListingsHeader onAddFacility={() => setIsFormOpen(true)} />

            {/* Main Content Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-5">
                {/* Search & 5 Dropdowns Filters */}
                <ListingsFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeTypeFilter={activeTypeFilter}
                    onTypeFilterChange={setActiveTypeFilter}
                />

                {/* Listings Table */}
                <ListingsTable
                    listings={filteredListings}
                    onViewListing={(listing) => setSelectedListingForView(listing)}
                    onToggleSuspend={toggleSuspend}
                />
            </div>

            {/* View Modal */}
            <ListingViewModal
                listing={selectedListingForView}
                onClose={() => setSelectedListingForView(null)}
                onToggleSuspend={toggleSuspend}
            />

            {/* Add Facility Form Modal */}
            <ListingFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveListing}
            />
        </div>
    );
}
