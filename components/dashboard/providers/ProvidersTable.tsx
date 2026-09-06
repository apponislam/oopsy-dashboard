"use client";

import { Eye, Edit3, ShieldCheck, Clock, Star } from "lucide-react";
import { Provider } from "./types";

interface ProvidersTableProps {
    providers: Provider[];
    onViewProvider: (provider: Provider) => void;
    onEditProvider: (provider: Provider) => void;
}

export function ProvidersTable({
    providers,
    onViewProvider,
    onEditProvider,
}: ProvidersTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3 px-3">Business</th>
                        <th className="py-3 px-3">Owner</th>
                        <th className="py-3 px-3">Listings</th>
                        <th className="py-3 px-3">Bookings</th>
                        <th className="py-3 px-3">Revenue</th>
                        <th className="py-3 px-3">Rating</th>
                        <th className="py-3 px-3">Verified</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                    {providers.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="py-8 text-center text-[#005461]/50 font-semibold">
                                No providers found.
                            </td>
                        </tr>
                    ) : (
                        providers.map((provider) => (
                            <tr key={provider.id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                <td className="py-3.5 px-3 font-mono font-bold text-[#005461]/70">
                                    {provider.id}
                                </td>
                                <td className="py-3.5 px-3 font-bold text-[#005461]">{provider.business}</td>
                                <td className="py-3.5 px-3 text-[#005461]/80">{provider.owner}</td>
                                <td className="py-3.5 px-3 font-bold">{provider.listings}</td>
                                <td className="py-3.5 px-3 font-bold">{provider.bookings}</td>
                                <td className="py-3.5 px-3 font-extrabold text-[#005461]">{provider.revenue}</td>
                                <td className="py-3.5 px-3">
                                    <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        {provider.rating.toFixed(1)}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            provider.verified === "Verified"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                : "bg-amber-50 text-amber-700 border border-amber-200"
                                        }`}
                                    >
                                        {provider.verified === "Verified" ? (
                                            <>
                                                <ShieldCheck className="w-3 h-3" />
                                                ✓ Verified
                                            </>
                                        ) : (
                                            <>
                                                <Clock className="w-3 h-3" />
                                                Pending
                                            </>
                                        )}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            provider.status === "Active"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-rose-50 text-rose-700"
                                        }`}
                                    >
                                        {provider.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onViewProvider(provider)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E2EFF1] hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-[11px] transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-3 h-3" />
                                            View
                                        </button>
                                        <button
                                            onClick={() => onEditProvider(provider)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#005461] hover:text-white text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                                        >
                                            <Edit3 className="w-3 h-3" />
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
