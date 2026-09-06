"use client";

import { Plus } from "lucide-react";

interface ProvidersHeaderProps {
    totalProviders: number;
    activeProviders: number;
    onAddProvider: () => void;
}

export function ProvidersHeader({
    totalProviders,
    activeProviders,
    onAddProvider,
}: ProvidersHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-[#005461]">Provider Management</h1>
                <p className="text-xs text-[#005461]/70 font-medium mt-0.5">
                    {totalProviders} providers · {activeProviders} active
                </p>
            </div>

            <button
                onClick={onAddProvider}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
                <Plus className="w-4 h-4" />
                Add Provider
            </button>
        </div>
    );
}
