"use client";

import { Eye, Ban, RotateCcw, Loader2 } from "lucide-react";
import { User } from "./types";
import { getImageUrl } from "@/utils/imageUrl";
import Image from "next/image";

interface UsersTableProps {
    users: User[];
    isLoading?: boolean;
    onViewUser: (user: User) => void;
    onToggleStatus: (userId: string, currentActive: boolean, userName: string) => void;
    isUpdatingStatusId?: string | null;
}

export function UsersTable({ users, isLoading = false, onViewUser, onToggleStatus, isUpdatingStatusId }: UsersTableProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return "—";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    const formatRole = (role?: string) => {
        if (!role) return "User";
        switch (role.toUpperCase()) {
            case "CLIENT":
                return "Client";
            case "PROVIDER":
                return "Provider";
            case "SUPER_ADMIN":
                return "Super Admin";
            case "ADMIN":
                return "Admin";
            default:
                return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">ID / Code</th>
                        <th className="py-3 px-3">User</th>
                        <th className="py-3 px-3">Email</th>
                        <th className="py-3 px-3">Role</th>
                        <th className="py-3 px-3">Joined</th>
                        <th className="py-3 px-3">Bookings</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                    {isLoading ? (
                        <tr>
                            <td colSpan={8} className="py-12 text-center text-[#005461]/60">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Loader2 className="w-6 h-6 animate-spin text-[#005461]" />
                                    <span className="text-xs font-semibold">Loading users...</span>
                                </div>
                            </td>
                        </tr>
                    ) : users.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="py-10 text-center text-[#005461]/50 font-semibold">
                                No users found matching your search or filters.
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => {
                            const isCurrentUpdating = isUpdatingStatusId === user._id;
                            const displayId = user.referralCode || user._id.slice(-6).toUpperCase();
                            const avatarUrl = user.profileImage ? getImageUrl(user.profileImage) : null;
                            const isProvider = user.role?.toUpperCase() === "PROVIDER";
                            const isAdmin = user.role?.toUpperCase() === "SUPER_ADMIN" || user.role?.toUpperCase() === "ADMIN";

                            return (
                                <tr key={user._id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                    <td className="py-3.5 px-3 font-mono font-bold text-[#005461]/70">{displayId}</td>
                                    <td className="py-3.5 px-3">
                                        <div className="flex items-center gap-2.5">
                                            {avatarUrl ? (
                                                <div className="relative h-7 w-7 rounded-full overflow-hidden shrink-0 border border-[#005461]/20">
                                                    <Image src={avatarUrl} alt={user.name || "User"} fill className="object-cover" />
                                                </div>
                                            ) : (
                                                <div className="h-7 w-7 rounded-full bg-[#005461]/10 text-[#005461] font-bold text-xs flex items-center justify-center shrink-0">{(user.name || "U").charAt(0).toUpperCase()}</div>
                                            )}
                                            <span className="font-bold text-[#005461] truncate max-w-37.5">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-3 text-[#005461]/70 truncate max-w-45">{user.email}</td>
                                    <td className="py-3.5 px-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${isProvider ? "bg-[#005461]/10 text-[#005461]" : isAdmin ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-700"}`}>{formatRole(user.role)}</span>
                                    </td>
                                    <td className="py-3.5 px-3 text-[#005461]/70 whitespace-nowrap">{formatDate(user.createdAt)}</td>
                                    <td className="py-3.5 px-3 font-bold">{user.bookingCount ?? 0}</td>
                                    <td className="py-3.5 px-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{user.isActive ? "Active" : "Suspended"}</span>
                                    </td>
                                    <td className="py-3.5 px-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button type="button" onClick={() => onViewUser(user)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E2EFF1] hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-[11px] transition-colors cursor-pointer">
                                                <Eye className="w-3 h-3" />
                                                View
                                            </button>
                                            <button
                                                type="button"
                                                disabled={isCurrentUpdating}
                                                onClick={() => onToggleStatus(user._id, user.isActive, user.name || "this user")}
                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer disabled:opacity-50 ${
                                                    user.isActive ? "bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700" : "bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700"
                                                }`}
                                            >
                                                {isCurrentUpdating ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                ) : user.isActive ? (
                                                    <>
                                                        <Ban className="w-3 h-3" />
                                                        Suspend
                                                    </>
                                                ) : (
                                                    <>
                                                        <RotateCcw className="w-3 h-3" />
                                                        Restore
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;
