"use client";

import React, { useState } from "react";
import { IFaq } from "@/redux/features/faq/faqApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Edit2,
    Trash2,
    HelpCircle,
    Search,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    Plus,
    X,
} from "lucide-react";

interface FAQTableProps {
    items: IFaq[];
    isLoading: boolean;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onEdit: (item: IFaq) => void;
    onDelete: (item: IFaq) => void;
    meta?: {
        page: number;
        totalPages: number;
        total: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    onPageChange: (page: number) => void;
    onCreateNew: () => void;
}

export function FAQTable({
    items,
    isLoading,
    searchTerm,
    onSearchChange,
    onEdit,
    onDelete,
    meta,
    onPageChange,
    onCreateNew,
}: FAQTableProps) {
    const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search FAQs by question or answer..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9 pr-9 rounded-xl border-gray-200 focus:border-[#005461]"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => onSearchChange("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="text-xs text-gray-500 font-medium self-end sm:self-center">
                    Total: <span className="font-bold text-gray-800">{meta?.total ?? items.length}</span> FAQs
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-slate-50/70">
                            <th className="py-3.5 px-4 w-[45%]">Question & Answer</th>
                            <th className="py-3.5 px-4 w-[20%]">Last Updated</th>
                            <th className="py-3.5 px-4 w-[15%]">Status</th>
                            <th className="py-3.5 px-4 text-right w-[20%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, idx) => (
                                <tr key={idx} className="animate-pulse">
                                    <td className="py-4 px-4">
                                        <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
                                        <div className="h-3 bg-slate-50 rounded w-1/2" />
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="h-3 bg-slate-100 rounded w-20" />
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="h-5 bg-slate-100 rounded-full w-16" />
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="h-8 bg-slate-100 rounded-lg w-24 ml-auto" />
                                    </td>
                                </tr>
                            ))
                        ) : items.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-12 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-[#005461]">
                                            <HelpCircle className="h-6 w-6" />
                                        </div>
                                        <p className="text-base font-semibold text-gray-900">
                                            {searchTerm ? "No matching FAQs found" : "No FAQs created yet"}
                                        </p>
                                        <p className="text-xs text-gray-500 max-w-sm">
                                            {searchTerm
                                                ? "Try adjusting your search terms or clear the filter."
                                                : "Create frequently asked questions to help users and providers navigate your platform."}
                                        </p>
                                        {!searchTerm && (
                                            <Button
                                                onClick={onCreateNew}
                                                size="sm"
                                                className="bg-[#005461] hover:bg-[#00424d] text-white rounded-xl gap-1.5 mt-2 cursor-pointer"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Create First FAQ
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => {
                                const isExpanded = !!expandedIds[item._id];
                                return (
                                    <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="py-4 px-4 align-top">
                                            <div className="space-y-1.5">
                                                <div className="flex items-start gap-2.5">
                                                    <HelpCircle className="h-4 w-4 text-[#088395] shrink-0 mt-0.5" />
                                                    <span className="font-semibold text-gray-900 leading-snug">
                                                        {item.question}
                                                    </span>
                                                </div>
                                                <div className="pl-6.5">
                                                    <p
                                                        className={`text-xs text-gray-600 leading-relaxed ${
                                                            isExpanded ? "whitespace-pre-wrap" : "line-clamp-2"
                                                        }`}
                                                    >
                                                        {item.answer}
                                                    </p>
                                                    {item.answer && item.answer.length > 120 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleExpand(item._id)}
                                                            className="text-[11px] font-semibold text-[#005461] hover:underline flex items-center gap-0.5 mt-1 cursor-pointer"
                                                        >
                                                            {isExpanded ? (
                                                                <>
                                                                    Show less <ChevronUp className="h-3 w-3" />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Read more <ChevronDown className="h-3 w-3" />
                                                                </>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 align-top text-gray-500 text-xs font-medium">
                                            {formatDate(item.updatedAt || item.createdAt)}
                                        </td>
                                        <td className="py-4 px-4 align-top">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                                Published
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 align-top text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    className="h-8 px-2.5 text-xs gap-1.5 text-gray-700 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                                >
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onDelete(item)}
                                                    className="h-8 px-2.5 text-xs gap-1.5 text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 rounded-lg cursor-pointer"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-gray-500">
                        Page <span className="font-semibold text-gray-800">{meta.page}</span> of{" "}
                        <span className="font-semibold text-gray-800">{meta.totalPages}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!meta.hasPrev || isLoading}
                            onClick={() => onPageChange(meta.page - 1)}
                            className="h-8 px-3 rounded-lg text-xs gap-1 cursor-pointer disabled:opacity-40"
                        >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!meta.hasNext || isLoading}
                            onClick={() => onPageChange(meta.page + 1)}
                            className="h-8 px-3 rounded-lg text-xs gap-1 cursor-pointer disabled:opacity-40"
                        >
                            Next
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
