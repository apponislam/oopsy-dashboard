"use client";

import { Eye, Ban, RotateCcw } from "lucide-react";
import { User } from "./types";

interface UsersTableProps {
    users: User[];
    onViewUser: (user: User) => void;
    onToggleStatus: (userId: string) => void;
}

export function UsersTable({ users, onViewUser, onToggleStatus }: UsersTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">ID</th>
                        <th className="py-3 px-3">Name</th>
                        <th className="py-3 px-3">Email</th>
                        <th className="py-3 px-3">Role</th>
                        <th className="py-3 px-3">Joined</th>
                        <th className="py-3 px-3">Bookings</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="py-8 text-center text-[#005461]/50 font-semibold">
                                No users found matching your filter.
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                <td className="py-3.5 px-3 font-mono font-bold text-[#005461]/70">
                                    {user.id}
                                </td>
                                <td className="py-3.5 px-3 font-bold">{user.name}</td>
                                <td className="py-3.5 px-3 text-[#005461]/70">{user.email}</td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                            user.role === "Provider"
                                                ? "bg-[#005461]/10 text-[#005461]"
                                                : "bg-slate-100 text-slate-700"
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-[#005461]/70">{user.joined}</td>
                                <td className="py-3.5 px-3 font-bold">{user.bookings}</td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            user.status === "Active"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : user.status === "Suspended"
                                                ? "bg-rose-50 text-rose-700"
                                                : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onViewUser(user)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E2EFF1] hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-[11px] transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-3 h-3" />
                                            View
                                        </button>
                                        <button
                                            onClick={() => onToggleStatus(user.id)}
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                                                user.status === "Active"
                                                    ? "bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700"
                                                    : "bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700"
                                            }`}
                                        >
                                            {user.status === "Active" ? (
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
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
