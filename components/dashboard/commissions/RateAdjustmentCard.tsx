"use client";

import { useState } from "react";
import { Percent, TrendingUp, CheckCircle2 } from "lucide-react";

interface RateAdjustmentCardProps {
    defaultRate: number;
    onApplyRate: (newRate: number) => void;
}

export function RateAdjustmentCard({ defaultRate, onApplyRate }: RateAdjustmentCardProps) {
    const [rate, setRate] = useState<number>(defaultRate);
    const [isApplied, setIsApplied] = useState<boolean>(false);

    // Dynamic projected revenue calculation based on base monthly volume (~£182,430)
    const baseVolume = 182430;
    const projectedRevenue = Math.round((baseVolume * rate) / 100);

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        onApplyRate(rate);
        setIsApplied(true);
        setTimeout(() => setIsApplied(false), 3000);
    };

    return (
        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs h-full flex flex-col justify-between space-y-6">
            <div className="space-y-5">
                <div className="pb-4 border-b border-[#005461]/10">
                    <h3 className="text-base font-bold text-[#005461]">Rate Adjustment</h3>
                    <p className="text-xs text-[#005461]/60 font-medium mt-0.5">
                        Set platform commission fee percentage
                    </p>
                </div>

                <form onSubmit={handleApply} className="space-y-4 text-xs">
                    <div>
                        <label className="block text-xs font-bold text-[#005461] mb-1.5">
                            Default commission rate (%)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min={0}
                                max={100}
                                step={0.5}
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full h-11 px-3.5 pl-9 bg-[#f0f9fa] border border-[#005461]/15 rounded-xl text-sm font-bold text-[#005461] focus:outline-none focus:ring-2 focus:ring-[#005461]/20"
                            />
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#005461]/50 pointer-events-none" />
                        </div>
                    </div>

                    {/* Projected Revenue Display Box */}
                    <div className="p-4 rounded-xl bg-[#f0f9fa] border border-[#005461]/10 space-y-1">
                        <span className="text-[11px] font-semibold text-[#005461]/70 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-[#005461]" />
                            Projected revenue at {rate}%
                        </span>
                        <p className="text-2xl font-black text-[#005461] tracking-tight">
                            £{projectedRevenue.toLocaleString()}/mo
                        </p>
                    </div>

                    {isApplied && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            New rate of {rate}% applied successfully!
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                    >
                        Apply New Rate
                    </button>
                </form>
            </div>
        </div>
    );
}
