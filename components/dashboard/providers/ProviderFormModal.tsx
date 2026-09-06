"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Provider } from "./types";

interface ProviderFormModalProps {
    isOpen: boolean;
    providerToEdit: Provider | null;
    onClose: () => void;
    onSave: (provider: Provider) => void;
}

export function ProviderFormModal({
    isOpen,
    providerToEdit,
    onClose,
    onSave,
}: ProviderFormModalProps) {
    const [business, setBusiness] = useState("");
    const [owner, setOwner] = useState("");
    const [listings, setListings] = useState(1);
    const [verified, setVerified] = useState<"Verified" | "Pending">("Pending");
    const [status, setStatus] = useState<"Active" | "Suspended">("Active");

    useEffect(() => {
        if (providerToEdit) {
            setBusiness(providerToEdit.business);
            setOwner(providerToEdit.owner);
            setListings(providerToEdit.listings);
            setVerified(providerToEdit.verified);
            setStatus(providerToEdit.status);
        } else {
            setBusiness("");
            setOwner("");
            setListings(1);
            setVerified("Pending");
            setStatus("Active");
        }
    }, [providerToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!business.trim() || !owner.trim()) return;

        const updatedProvider: Provider = {
            id: providerToEdit ? providerToEdit.id : `P-00${Math.floor(Math.random() * 900 + 100)}`,
            business: business.trim(),
            owner: owner.trim(),
            listings: Number(listings),
            bookings: providerToEdit ? providerToEdit.bookings : 0,
            revenue: providerToEdit ? providerToEdit.revenue : "£0",
            rating: providerToEdit ? providerToEdit.rating : 5.0,
            verified,
            status,
        };

        onSave(updatedProvider);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#005461]">
                        {providerToEdit ? "Edit Provider" : "Add New Provider"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg bg-white/80 hover:bg-white text-[#005461] flex items-center justify-center transition-colors cursor-pointer border border-[#005461]/10"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
                    <div>
                        <label className="block text-[11px] font-bold text-[#005461] mb-1">
                            Business Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. CleanSpace Ltd"
                            value={business}
                            onChange={(e) => setBusiness(e.target.value)}
                            className="w-full h-10 px-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-[#005461] mb-1">
                            Owner Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Marcus Webb"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            className="w-full h-10 px-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-[#005461] mb-1">
                            Listings Count
                        </label>
                        <input
                            type="number"
                            min={1}
                            required
                            value={listings}
                            onChange={(e) => setListings(Number(e.target.value))}
                            className="w-full h-10 px-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-bold text-[#005461] mb-1">
                                Verification
                            </label>
                            <select
                                value={verified}
                                onChange={(e) => setVerified(e.target.value as "Verified" | "Pending")}
                                className="w-full h-10 px-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                            >
                                <option value="Verified">Verified</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-[#005461] mb-1">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as "Active" | "Suspended")}
                                className="w-full h-10 px-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                            >
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#005461]/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl bg-white border border-[#005461]/20 hover:bg-[#E2EFF1] text-[#005461] text-xs font-bold transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                            {providerToEdit ? "Save Changes" : "Create Provider"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
