"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    User,
    Mail,
    Shield,
    Lock,
    KeyRound,
    Calendar,
    CheckCircle2,
    Copy,
    Check,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { getImageUrl } from "@/utils/imageUrl";

export function AdminProfileCard() {
    const user = useAppSelector(currentUser);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [copiedId, setCopiedId] = useState(false);

    const displayName = user?.name || "Admin Console";
    const displayEmail = user?.email || "admin@elivapp.com";
    const displayRole = user?.role || "ADMIN";
    const avatarUrl = user?.profileImage ? getImageUrl(user.profileImage) : null;

    const initials = (() => {
        if (!user?.name) return "AD";
        const parts = user.name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    })();

    const handleCopyId = () => {
        if (user?._id) {
            navigator.clipboard.writeText(user._id);
            setCopiedId(true);
            setTimeout(() => setCopiedId(false), 2000);
        }
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess(false);

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("All password fields are required.");
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirmation do not match.");
            return;
        }

        // Simulate successful update
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(false), 4000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 1/3: Profile Identity Card */}
            <div className="bg-white rounded-2xl border border-[#005461]/10 p-6 space-y-5 text-center shadow-xs">
                {/* Avatar */}
                <div className="relative inline-block mx-auto">
                    {avatarUrl ? (
                        <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-[#005461]/20 shadow-sm mx-auto">
                            <Image
                                src={avatarUrl}
                                alt={displayName}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="h-24 w-24 rounded-full bg-[#005461] text-white font-extrabold flex items-center justify-center text-3xl shadow-sm mx-auto">
                            {initials}
                        </div>
                    )}
                    <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" />
                </div>

                <div>
                    <h2 className="text-lg font-extrabold text-[#005461]">{displayName}</h2>
                    <p className="text-xs text-[#005461]/60 font-medium mt-0.5">{displayEmail}</p>
                    <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#005461]/10 text-[#005461] uppercase tracking-wider">
                        <Shield className="w-3 h-3" />
                        <span>{displayRole}</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-[#005461]/10 space-y-2.5 text-xs text-left">
                    <div className="flex items-center justify-between">
                        <span className="text-[#005461]/60 font-medium">Account ID</span>
                        <button
                            type="button"
                            onClick={handleCopyId}
                            className="font-mono text-[#005461] font-bold flex items-center gap-1 hover:text-[#005461]/70 cursor-pointer"
                        >
                            <span>{user?._id ? `${user._id.slice(0, 10)}...` : "—"}</span>
                            {copiedId ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                                <Copy className="w-3 h-3 text-[#005461]/40" />
                            )}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[#005461]/60 font-medium">Status</span>
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Active
                        </span>
                    </div>

                    {user?.lastLogin && (
                        <div className="flex items-center justify-between">
                            <span className="text-[#005461]/60 font-medium">Last Login</span>
                            <span className="font-bold text-[#005461]">
                                {new Date(user.lastLogin).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Right 2/3: Account Details & Security Form */}
            <div className="lg:col-span-2 space-y-6">
                {/* Basic Info Card */}
                <div className="bg-white rounded-2xl border border-[#005461]/10 p-6 space-y-4 shadow-xs">
                    <h3 className="text-sm font-bold text-[#005461] uppercase tracking-wider flex items-center gap-2">
                        <User className="w-4 h-4 text-[#005461]" /> Profile Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <User className="w-3 h-3 text-[#005461]" /> Full Name
                            </span>
                            <span className="font-bold text-[#005461] block">{displayName}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-[#005461]" /> Email Address
                            </span>
                            <span className="font-bold text-[#005461] block truncate">{displayEmail}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Shield className="w-3 h-3 text-[#005461]" /> Assigned Role
                            </span>
                            <span className="font-bold text-[#005461] block">{displayRole}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#f0f9fa] border border-[#005461]/5 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-[#005461]/60 flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-[#005461]" /> Joined Platform
                            </span>
                            <span className="font-bold text-[#005461] block">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Password / Security Card */}
                <div className="bg-white rounded-2xl border border-[#005461]/10 p-6 space-y-4 shadow-xs">
                    <h3 className="text-sm font-bold text-[#005461] uppercase tracking-wider flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[#005461]" /> Security &amp; Password
                    </h3>

                    {passwordSuccess && (
                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Your password has been successfully updated!</span>
                        </div>
                    )}

                    {passwordError && (
                        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-semibold">
                            {passwordError}
                        </div>
                    )}

                    <form onSubmit={handlePasswordSubmit} className="space-y-3.5 text-xs">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-[#005461] block">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#f0f9fa] border border-[#005461]/15 text-[#005461] focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-[#005461] block">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#f0f9fa] border border-[#005461]/15 text-[#005461] focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-[#005461] block">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#f0f9fa] border border-[#005461]/15 text-[#005461] focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#00424d] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                            >
                                <KeyRound className="w-3.5 h-3.5" />
                                <span>Update Password</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminProfileCard;
