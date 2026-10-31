"use client";

interface ProvidersHeaderProps {
    totalProviders: number;
    activeProviders: number;
}

export function ProvidersHeader({
    totalProviders,
    activeProviders,
}: ProvidersHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-[#005461]">Provider Management</h1>
                <p className="text-xs text-[#005461]/70 font-medium mt-0.5">
                    {totalProviders} providers · {activeProviders} active
                </p>
            </div>
        </div>
    );
}

export default ProvidersHeader;
