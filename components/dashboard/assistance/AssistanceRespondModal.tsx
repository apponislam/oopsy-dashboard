"use client";

import { useState } from "react";
import { X, MessageSquare, Send, User, Calendar, Tag, CheckCircle2 } from "lucide-react";
import { AssistanceTicket } from "./types";

interface AssistanceRespondModalProps {
    ticket: AssistanceTicket | null;
    onClose: () => void;
    onSendResponse: (ticketId: string, replyText: string) => void;
    onResolve: (ticketId: string) => void;
}

export function AssistanceRespondModal({
    ticket,
    onClose,
    onSendResponse,
    onResolve,
}: AssistanceRespondModalProps) {
    const [replyText, setReplyText] = useState("");

    if (!ticket) return null;

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        onSendResponse(ticket.id, replyText);
        setReplyText("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#005461] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#005461]">Support Ticket</h3>
                            <span className="text-xs text-[#005461]/60 font-mono font-semibold">
                                {ticket.id}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg bg-white/80 hover:bg-white text-[#005461] flex items-center justify-center transition-colors cursor-pointer border border-[#005461]/10"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form & Content */}
                <form onSubmit={handleSend} className="p-6 space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <User className="w-3 h-3 text-[#005461]" /> User
                            </span>
                            <span className="font-bold text-[#005461]">{ticket.user}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Tag className="w-3 h-3 text-[#005461]" /> Topic
                            </span>
                            <span className="font-bold text-[#005461]">{ticket.topic}</span>
                        </div>
                    </div>

                    {/* Original Message */}
                    <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center justify-between">
                            <span>User Message</span>
                            <span className="flex items-center gap-1 font-semibold text-[#005461]/50">
                                <Calendar className="w-3 h-3" /> {ticket.submitted}
                            </span>
                        </span>
                        <p className="text-xs font-medium text-[#005461] leading-relaxed bg-white p-3 rounded-lg border border-[#005461]/10">
                            "{ticket.message}"
                        </p>
                    </div>

                    {/* Reply Textarea */}
                    <div>
                        <label className="block text-xs font-bold text-[#005461] mb-1.5">
                            Official Support Reply
                        </label>
                        <textarea
                            rows={3}
                            required
                            placeholder="Type your response to the user…"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="w-full p-3 bg-[#f0f9fa] border border-[#005461]/10 rounded-xl text-xs font-medium text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-2 focus:ring-[#005461]/20 resize-none"
                        />
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-[#005461]/10 flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                onResolve(ticket.id);
                                onClose();
                            }}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
                        >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Mark Resolved
                        </button>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-xl bg-white border border-[#005461]/20 hover:bg-[#E2EFF1] text-[#005461] text-xs font-bold transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#005461]/90 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                            >
                                <Send className="w-3.5 h-3.5" />
                                Send Response
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
