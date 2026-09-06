"use client";

interface AlertItem {
    id: string;
    title: string;
    time: string;
}

const alerts: AlertItem[] = [
    { id: "1", title: "Safety incident — Refresh Point W1", time: "10m ago" },
    { id: "2", title: "Provider verification expired — ZenSpa", time: "2h ago" },
    { id: "3", title: "Disputed payment #T-4817", time: "3h ago" },
    { id: "4", title: "New market launched — Birmingham", time: "1d ago" },
];

export function PlatformAlerts() {
    return (
        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs">
            <h3 className="text-base font-bold text-[#005461] pb-4 border-b border-[#005461]/10">
                Platform Alerts
            </h3>

            <div className="mt-4 space-y-3">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5"
                    >
                        <span className="text-xs font-semibold text-[#005461]">
                            {alert.title}
                        </span>
                        <span className="text-[10px] font-bold text-[#005461]/60 shrink-0 ml-2">
                            {alert.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
