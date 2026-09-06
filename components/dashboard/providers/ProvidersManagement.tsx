"use client";

import { useState } from "react";
import { Provider, ProviderStats } from "./types";
import { ProvidersHeader } from "./ProvidersHeader";
import { ProvidersStatsCards } from "./ProvidersStatsCards";
import { ProvidersTable } from "./ProvidersTable";
import { ProviderViewModal } from "./ProviderViewModal";
import { ProviderFormModal } from "./ProviderFormModal";

const initialProviders: Provider[] = [
    {
        id: "P-001",
        business: "CleanSpace Ltd",
        owner: "Marcus Webb",
        listings: 3,
        bookings: 143,
        revenue: "£4,820",
        rating: 4.9,
        verified: "Verified",
        status: "Active",
    },
    {
        id: "P-002",
        business: "Refresh Hub",
        owner: "Lily Wang",
        listings: 2,
        bookings: 89,
        revenue: "£2,670",
        rating: 4.8,
        verified: "Verified",
        status: "Active",
    },
    {
        id: "P-003",
        business: "ZenSpa London",
        owner: "Alice Park",
        listings: 1,
        bookings: 12,
        revenue: "£960",
        rating: 4.6,
        verified: "Pending",
        status: "Active",
    },
    {
        id: "P-004",
        business: "SecureBox",
        owner: "Tom Harris",
        listings: 4,
        bookings: 201,
        revenue: "£6,030",
        rating: 4.7,
        verified: "Verified",
        status: "Suspended",
    },
];

const globalStats: ProviderStats = {
    total: 1284,
    verified: 1198,
    pending: 78,
    suspended: 8,
};

export function ProvidersManagement() {
    const [providers, setProviders] = useState<Provider[]>(initialProviders);
    const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);
    const [selectedProviderForView, setSelectedProviderForView] = useState<Provider | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [providerToEdit, setProviderToEdit] = useState<Provider | null>(null);

    const activeCount = providers.filter((p) => p.status === "Active").length;

    // Filter providers table based on stat card click
    const filteredProviders = providers.filter((p) => {
        if (!activeStatFilter || activeStatFilter === "Total") return true;
        if (activeStatFilter === "Verified") return p.verified === "Verified";
        if (activeStatFilter === "Pending") return p.verified === "Pending";
        if (activeStatFilter === "Suspended") return p.status === "Suspended";
        return true;
    });

    const handleSaveProvider = (savedProvider: Provider) => {
        setProviders((prev) => {
            const exists = prev.some((p) => p.id === savedProvider.id);
            if (exists) {
                return prev.map((p) => (p.id === savedProvider.id ? savedProvider : p));
            }
            return [savedProvider, ...prev];
        });
    };

    const handleOpenAddForm = () => {
        setProviderToEdit(null);
        setIsFormOpen(true);
    };

    const handleOpenEditForm = (provider: Provider) => {
        setProviderToEdit(provider);
        setIsFormOpen(true);
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <ProvidersHeader
                totalProviders={providers.length}
                activeProviders={activeCount}
                onAddProvider={handleOpenAddForm}
            />

            {/* Summary Stat Cards */}
            <ProvidersStatsCards
                stats={globalStats}
                activeStatFilter={activeStatFilter}
                onSelectStatFilter={setActiveStatFilter}
            />

            {/* Table Container */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs">
                <ProvidersTable
                    providers={filteredProviders}
                    onViewProvider={(provider) => setSelectedProviderForView(provider)}
                    onEditProvider={handleOpenEditForm}
                />
            </div>

            {/* View Modal */}
            <ProviderViewModal
                provider={selectedProviderForView}
                onClose={() => setSelectedProviderForView(null)}
            />

            {/* Form Modal (Add / Edit) */}
            <ProviderFormModal
                isOpen={isFormOpen}
                providerToEdit={providerToEdit}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveProvider}
            />
        </div>
    );
}
