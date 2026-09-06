"use client";

import React from "react";
import { PolicyItem } from "./types";
import { Button } from "@/components/ui/button";
import { Edit2, ExternalLink, ShieldCheck } from "lucide-react";

interface PolicyTableProps {
    items: PolicyItem[];
    onEdit: (item: PolicyItem) => void;
    onView: (item: PolicyItem) => void;
}

export function PolicyTable({ items, onEdit, onView }: PolicyTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-slate-50/50">
                        <th className="py-3.5 px-4 rounded-l-xl">Document</th>
                        <th className="py-3.5 px-4">Last Updated</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right rounded-r-xl">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-4 px-4 font-semibold text-gray-900">
                                <div className="flex items-center gap-2.5">
                                    <ShieldCheck className="h-4 w-4 text-[#088395] shrink-0" />
                                    <span>{item.title}</span>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-gray-500 text-xs font-medium">
                                {item.lastUpdated}
                            </td>
                            <td className="py-4 px-4">
                                {item.status === "Live" || item.status === "Published" ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                                        Live
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                                        Under Review
                                    </span>
                                )}
                            </td>
                            <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(item)}
                                        className="h-8 px-3 text-xs gap-1.5 text-gray-700 border-gray-200 rounded-lg hover:bg-gray-50"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onView(item)}
                                        className="h-8 px-3 text-xs gap-1.5 text-[#005461] border-gray-200 rounded-lg hover:bg-teal-50"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        View
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
