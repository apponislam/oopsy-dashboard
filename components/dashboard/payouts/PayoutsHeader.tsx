"use client";

import { Play } from "lucide-react";

interface PayoutsHeaderProps {
    onProcessAllScheduled: () => void;
}

export function PayoutsHeader({ onProcessAllScheduled }: PayoutsHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-[#005461]">Payout Management</h1>
                <p className="text-xs text-[#005461]/70 font-medium mt-0.5">
                    Provider payouts and transfers
                </p>
            </div>

            <button
                onClick={onProcessAllScheduled}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
            >
                <Play className="w-3.5 h-3.5 fill-white" />
                Process All Scheduled
            </button>
        </div>
    );
}
