"use client";

import React from "react";
import { IPolicy, PolicyTypeEnum } from "@/redux/features/public/publicApi";
import { PREDEFINED_POLICIES } from "./types";
import { Button } from "@/components/ui/button";
import { Edit2, ExternalLink, ShieldCheck, FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface PolicyTableProps {
    policiesState: Record<
        PolicyTypeEnum,
        {
            policy?: IPolicy;
            isLoading: boolean;
            isNotFound: boolean;
        }
    >;
    onEdit: (policyType: PolicyTypeEnum, defaultTitle: string, currentContent: string) => void;
    onView: (policyType: PolicyTypeEnum, defaultTitle: string) => void;
}

export function PolicyTable({ policiesState, onEdit, onView }: PolicyTableProps) {
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "Not published yet";
        return new Date(dateStr).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="space-y-4">
            <div className="text-xs text-gray-500 font-medium">
                Standard platform legal policies configured for public web & mobile app access.
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-slate-50/70">
                            <th className="py-3.5 px-4 w-[45%]">Document</th>
                            <th className="py-3.5 px-4 w-[20%]">Last Updated</th>
                            <th className="py-3.5 px-4 w-[15%]">Status</th>
                            <th className="py-3.5 px-4 text-right w-[20%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {PREDEFINED_POLICIES.map((item) => {
                            const state = policiesState[item.type] || {
                                isLoading: false,
                                isNotFound: true,
                            };
                            const policy = state.policy;
                            const isLive = !!policy && !state.isNotFound;

                            return (
                                <tr key={item.type} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="py-4 px-4 align-top">
                                        <div className="flex items-start gap-3">
                                            <div className="h-9 w-9 rounded-xl bg-teal-50 text-[#005461] flex items-center justify-center shrink-0 mt-0.5 border border-teal-100/50">
                                                <ShieldCheck className="h-5 w-5" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900">
                                                        {policy?.title || item.defaultTitle}
                                                    </span>
                                                    <code className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                                                        {item.type}
                                                    </code>
                                                </div>
                                                <p className="text-xs text-gray-500 line-clamp-1">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 align-top text-gray-500 text-xs font-medium">
                                        {state.isLoading ? (
                                            <div className="h-4 bg-slate-100 rounded w-24 animate-pulse" />
                                        ) : (
                                            formatDate(policy?.updatedAt || policy?.publishedAt)
                                        )}
                                    </td>
                                    <td className="py-4 px-4 align-top">
                                        {state.isLoading ? (
                                            <div className="h-5 bg-slate-100 rounded-full w-16 animate-pulse" />
                                        ) : isLive ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Live
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                                                <AlertCircle className="h-3 w-3" />
                                                Not Created
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 align-top text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    onEdit(
                                                        item.type,
                                                        policy?.title || item.defaultTitle,
                                                        policy?.content || ""
                                                    )
                                                }
                                                className="h-8 px-2.5 text-xs gap-1.5 text-gray-700 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                            >
                                                <Edit2 className="h-3.5 w-3.5" />
                                                {isLive ? "Edit" : "Configure"}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={!isLive || state.isLoading}
                                                onClick={() => onView(item.type, item.defaultTitle)}
                                                className="h-8 px-2.5 text-xs gap-1.5 text-[#005461] border-gray-200 rounded-lg hover:bg-teal-50 cursor-pointer disabled:opacity-40"
                                            >
                                                <ExternalLink className="h-3.5 w-3.5" />
                                                View
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
