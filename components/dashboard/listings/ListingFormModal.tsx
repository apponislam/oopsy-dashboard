"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Listing, FacilityType } from "./types";

interface ListingFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (listing: Listing) => void;
}

export function ListingFormModal({
    isOpen,
    onClose,
    onSave,
}: ListingFormModalProps) {
    const [title, setTitle] = useState("");
    const [provider, setProvider] = useState("");
    const [type, setType] = useState<FacilityType>("Restroom");
    const [city, setCity] = useState("London");
    const [price, setPrice] = useState("£8");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !provider.trim()) return;

        const newListing: Listing = {
            id: `L-00${Math.floor(Math.random() * 900 + 100)}`,
            title: title.trim(),
            provider: provider.trim(),
            type,
            city: city.trim() || "London",
            price: price.startsWith("£") ? price : `£${price}`,
            bookings: 0,
            rating: 5.0,
            status: "Live",
        };

        onSave(newListing);
        onClose();
        setTitle("");
        setProvider("");
        setType("Restroom");
        setPrice("£8");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#005461]">
                        Add Public Facility
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
                            Facility Title
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. CleanSpace Soho"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-10 px-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-[#005461] mb-1">
                            Provider Business Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. CleanSpace Ltd"
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            className="w-full h-10 px-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-bold text-[#005461] mb-1">
                                Facility Type
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as FacilityType)}
                                className="w-full h-10 px-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                            >
                                <option value="Restroom">Restroom</option>
                                <option value="Shower">Shower</option>
                                <option value="Spa">Spa</option>
                                <option value="Locker">Locker</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-[#005461] mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full h-10 px-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-[#005461] mb-1">
                            Price per Booking
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. £8"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full h-10 px-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                        />
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
                            Create Facility
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
