"use client";

const quickActions = [
    { title: "Review pending verifications", count: 8 },
    { title: "Resolve open complaints", count: 14 },
    { title: "Process pending payouts", count: 6 },
    { title: "Moderate flagged reviews", count: 5 },
];

export function QuickActions() {
    return (
        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs flex flex-col justify-between h-full">
            <div>
                <h3 className="text-base font-bold text-[#005461] pb-4 border-b border-[#005461]/10">
                    Quick Actions
                </h3>

                <div className="mt-4 space-y-3">
                    {quickActions.map((action) => (
                        <div
                            key={action.title}
                            className="flex items-center justify-between p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5"
                        >
                            <span className="text-xs font-semibold text-[#005461]">
                                {action.title}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#005461] text-white">
                                {action.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
