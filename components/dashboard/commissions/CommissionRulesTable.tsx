"use client";

import { CommissionRule } from "./types";

interface CommissionRulesTableProps {
    rules: CommissionRule[];
}

export function CommissionRulesTable({ rules }: CommissionRulesTableProps) {
    return (
        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs h-full flex flex-col justify-between">
            <div>
                <div className="pb-4 border-b border-[#005461]/10">
                    <h3 className="text-base font-bold text-[#005461]">Commission Rules</h3>
                    <p className="text-xs text-[#005461]/60 font-medium mt-0.5">
                        Rates applied per booking category
                    </p>
                </div>

                <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                                <th className="py-3 px-3">Category</th>
                                <th className="py-3 px-3">Rate</th>
                                <th className="py-3 px-3">Active Providers</th>
                                <th className="py-3 px-3 text-right">Monthly Volume</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                            {rules.map((rule) => (
                                <tr key={rule.id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                    <td className="py-3.5 px-3">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[#005461]">{rule.category}</span>
                                            {rule.description && (
                                                <span className="text-[10px] text-[#005461]/60 font-normal">
                                                    {rule.description}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#005461]/10 text-[#005461]">
                                            {rule.rate}%
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-3 font-bold">{rule.activeProviders}</td>
                                    <td className="py-3.5 px-3 text-right font-extrabold text-[#005461]">
                                        {rule.monthlyVolume}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
