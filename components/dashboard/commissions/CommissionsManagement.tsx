"use client";

import { useState } from "react";
import { CommissionRule } from "./types";
import { CommissionsHeader } from "./CommissionsHeader";
import { CommissionRulesTable } from "./CommissionRulesTable";
import { RateAdjustmentCard } from "./RateAdjustmentCard";

const initialRules: CommissionRule[] = [
    {
        id: "1",
        category: "Standard",
        description: "Restroom, Shower, Locker",
        rate: 10,
        activeProviders: 842,
        monthlyVolume: "£124,200",
    },
    {
        id: "2",
        category: "Premium",
        description: "Spa, Jacuzzi, Hot Tub",
        rate: 12,
        activeProviders: 186,
        monthlyVolume: "£38,400",
    },
    {
        id: "3",
        category: "Public Facility Partners",
        description: "Partner municipal facilities",
        rate: 0,
        activeProviders: 0,
        monthlyVolume: "N/A",
    },
];

export function CommissionsManagement() {
    const [rules, setRules] = useState<CommissionRule[]>(initialRules);
    const [defaultRate, setDefaultRate] = useState<number>(10);

    const handleApplyNewRate = (newRate: number) => {
        setDefaultRate(newRate);
        setRules((prev) =>
            prev.map((rule) => {
                if (rule.category === "Standard") {
                    return { ...rule, rate: newRate };
                }
                return rule;
            })
        );
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <CommissionsHeader />

            {/* 2 Side Grid (Left Table, Right Rate Adjustment) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                    <CommissionRulesTable rules={rules} />
                </div>
                <div className="lg:col-span-1">
                    <RateAdjustmentCard
                        defaultRate={defaultRate}
                        onApplyRate={handleApplyNewRate}
                    />
                </div>
            </div>
        </div>
    );
}
