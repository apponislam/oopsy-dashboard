"use client";

import { X, Mail, Shield, Calendar, BookOpen } from "lucide-react";
import { User } from "./types";

interface UserDetailModalProps {
    user: User | null;
    onClose: () => void;
    onToggleStatus: (userId: string) => void;
}

export function UserDetailModal({ user, onClose, onToggleStatus }: UserDetailModalProps) {
    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-[#005461]/20 shadow-xl max-w-md w-full overflow-hidden">
                {/* Modal Header */}
                <div className="p-5 bg-[#f0f9fa] border-b border-[#005461]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#005461] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#005461]">{user.name}</h3>
                            <span className="text-xs text-[#005461]/60 font-mono font-semibold">
                                ID: {user.id}
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

                {/* Modal Content */}
                <div className="p-6 space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-[#005461]" /> Email Address
                            </span>
                            <span className="font-bold text-[#005461] truncate">{user.email}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Shield className="w-3 h-3 text-[#005461]" /> User Role
                            </span>
                            <span className="font-bold text-[#005461]">{user.role}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-[#005461]" /> Date Joined
                            </span>
                            <span className="font-bold text-[#005461]">{user.joined}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-[#005461]" /> Total Bookings
                            </span>
                            <span className="font-bold text-[#005461]">{user.bookings}</span>
                        </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 flex items-center justify-between">
                        <span className="font-semibold text-[#005461]/70">Account Status</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                                user.status === "Active"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : user.status === "Suspended"
                                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                                    : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}
                        >
                            {user.status}
                        </span>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-[#f0f9fa] border-t border-[#005461]/10 flex items-center justify-between gap-3">
                    <button
                        onClick={() => onToggleStatus(user.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            user.status === "Active"
                                ? "bg-rose-600 hover:bg-rose-700 text-white"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                    >
                        {user.status === "Active" ? "Suspend Account" : "Restore Account"}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-white border border-[#005461]/20 hover:bg-[#E2EFF1] text-[#005461] text-xs font-bold transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
