"use client";

import React, { useState } from "react";
import { SafetyIncident } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, Send, X } from "lucide-react";

interface ContactProviderModalProps {
    incident: SafetyIncident | null;
    isOpen: boolean;
    onClose: () => void;
    onSendMessage: (incidentId: string, subject: string, message: string) => void;
}

export function ContactProviderModal({ incident, isOpen, onClose, onSendMessage }: ContactProviderModalProps) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    if (!isOpen || !incident) return null;

    const handleSend = () => {
        onSendMessage(incident.id, subject, message);
        setSubject("");
        setMessage("");
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
                        <Mail className="h-4 w-4" />
                        Provider Communication
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Contact Facility Provider</h3>
                    <p className="text-sm text-gray-500">
                        Send urgent notice regarding safety incident at <span className="font-semibold text-gray-800">{incident.facility}</span>.
                    </p>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-teal-50 border border-teal-100 rounded-xl text-xs text-teal-900">
                    <Phone className="h-4 w-4 text-[#005461] shrink-0" />
                    <div>
                        <span className="font-semibold">Urgent Support Line:</span> +1 (800) 555-SAFE
                        <span className="text-teal-700 block">Available 24/7 for critical facility incidents.</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 block">Subject</label>
                        <Input placeholder={`URGENT: Safety Incident - ${incident.facility}`} value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-xl" />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 block">Message Content</label>
                        <textarea
                            placeholder="Describe requested immediate actions, facility access requirements, or dispatch details..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full min-h-30 p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005461]/20 focus:border-[#005461] transition-all resize-y"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button variant="outline" onClick={onClose} className="rounded-xl">
                        Cancel
                    </Button>
                    <Button onClick={handleSend} className="bg-[#005461] hover:bg-[#00424d] text-white gap-1.5 rounded-xl">
                        <Send className="h-4 w-4" />
                        Send Notice
                    </Button>
                </div>
            </div>
        </div>
    );
}
