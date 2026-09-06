"use client";

import React, { useState } from "react";
import { SafetyIncident } from "./types";
import { Button } from "@/components/ui/button";
import { X, ShieldAlert } from "lucide-react";

interface InvestigateModalProps {
    incident: SafetyIncident | null;
    isOpen: boolean;
    onClose: () => void;
    onSaveNotes: (incidentId: string, notes: string) => void;
}

export function InvestigateModal({ incident, isOpen, onClose, onSaveNotes }: InvestigateModalProps) {
    const [notes, setNotes] = useState("");

    if (!isOpen || !incident) return null;

    const handleSave = () => {
        onSaveNotes(incident.id, notes);
        setNotes("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 space-y-5 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors">
                    <X className="h-5 w-5" />
                </button>

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#088395] text-xs font-semibold uppercase tracking-wider">
                        <ShieldAlert className="h-4 w-4" />
                        Investigation Protocol
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Investigate Safety Incident</h3>
                    <p className="text-sm text-gray-500">
                        Review details and update status for <span className="font-semibold text-gray-800">{incident.facility}</span>.
                    </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Category:</span>
                        <span className="font-semibold text-gray-800">{incident.category}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Severity:</span>
                        <span className="font-semibold text-gray-800">{incident.severity}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Current Status:</span>
                        <span className="font-semibold text-gray-800">{incident.status}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                        <span className="text-gray-500 font-medium block mb-1">Issue Description:</span>
                        <p className="text-gray-800 text-xs leading-relaxed bg-white p-3 rounded-lg border border-slate-200">{incident.description}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block">Investigation Notes & Action Plan</label>
                    <textarea
                        placeholder="Add notes about actions taken, status updates, or safety team findings..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full min-h-25 p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005461]/20 focus:border-[#005461] transition-all resize-y"
                    />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button variant="outline" onClick={onClose} className="rounded-xl">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-[#005461] hover:bg-[#00424d] text-white rounded-xl">
                        Save Investigation Notes
                    </Button>
                </div>
            </div>
        </div>
    );
}
