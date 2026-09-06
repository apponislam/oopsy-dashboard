"use client";

import React from "react";
import { SafetyIncident } from "./types";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, CheckCircle2, PhoneCall, Search } from "lucide-react";

interface SafetyIncidentCardProps {
    incident: SafetyIncident;
    onInvestigate: (incident: SafetyIncident) => void;
    onContactProvider: (incident: SafetyIncident) => void;
}

export function SafetyIncidentCard({
    incident,
    onInvestigate,
    onContactProvider,
}: SafetyIncidentCardProps) {
    const getSeverityBadge = (severity: SafetyIncident["severity"]) => {
        switch (severity) {
            case "Critical":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                        Critical
                    </span>
                );
            case "High":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">
                        High
                    </span>
                );
            case "Medium":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                        Medium
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        Low
                    </span>
                );
        }
    };

    const getStatusBadge = (status: SafetyIncident["status"]) => {
        switch (status) {
            case "Investigating":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-300">
                        <Clock className="h-3 w-3" />
                        Investigating
                    </span>
                );
            case "Open":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-300">
                        <AlertCircle className="h-3 w-3" />
                        Open
                    </span>
                );
            case "Resolved":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-300">
                        <CheckCircle2 className="h-3 w-3" />
                        Resolved
                    </span>
                );
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg text-gray-900">{incident.facility}</h3>
                        {getSeverityBadge(incident.severity)}
                        {getStatusBadge(incident.status)}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#088395]">
                        {incident.category}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pt-1">
                        {incident.description}
                    </p>
                    <div className="text-xs text-gray-400 pt-1">
                        Reported on {incident.reportedDate}
                    </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0 justify-end sm:justify-start">
                    <Button
                        variant="default"
                        onClick={() => onInvestigate(incident)}
                        className="bg-[#005461] hover:bg-[#00424d] text-white gap-1.5 text-xs h-9 px-4 font-medium"
                    >
                        <Search className="h-3.5 w-3.5" />
                        Investigate
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => onContactProvider(incident)}
                        className="border-gray-300 hover:bg-gray-50 text-gray-700 gap-1.5 text-xs h-9 px-4 font-medium"
                    >
                        <PhoneCall className="h-3.5 w-3.5" />
                        Contact Provider
                    </Button>
                </div>
            </div>
        </div>
    );
}
