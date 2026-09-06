"use client";

import { VerificationApplication } from "./types";

interface VerificationListProps {
    applications: VerificationApplication[];
    selectedId: string | null;
    onSelect: (app: VerificationApplication) => void;
}

export function VerificationList({
    applications,
    selectedId,
    onSelect,
}: VerificationListProps) {
    const pendingApps = applications.filter((app) => app.status === "Pending");

    return (
        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#005461]/10">
                    <h3 className="text-base font-bold text-[#005461]">
                        Pending ({pendingApps.length})
                    </h3>
                    <span className="text-xs font-semibold text-[#005461]/60">
                        {applications.length} total
                    </span>
                </div>

                <div className="mt-4 space-y-3">
                    {pendingApps.length === 0 ? (
                        <div className="py-8 text-center text-xs text-[#005461]/50 font-semibold">
                            No pending applications left to review.
                        </div>
                    ) : (
                        pendingApps.map((app) => {
                            const isSelected = selectedId === app.id;
                            return (
                                <div
                                    key={app.id}
                                    onClick={() => onSelect(app)}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                                        isSelected
                                            ? "bg-[#f0f9fa] border-[#005461] shadow-2xs ring-2 ring-[#005461]/10"
                                            : "bg-white border-[#005461]/10 hover:border-[#088395]/40 hover:bg-[#f0f9fa]/40"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-bold text-[#005461]">
                                            {app.business}
                                        </h4>
                                        {app.isUrgent && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
                                                Urgent
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-[#005461]/70 font-medium mt-1">
                                        {app.owner} · {app.type}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
