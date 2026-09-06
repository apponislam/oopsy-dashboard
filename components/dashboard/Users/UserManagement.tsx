"use client";

import { useState } from "react";
import { User } from "./types";
import { UsersHeader } from "./UsersHeader";
import { UsersFilter, RoleFilterOption } from "./UsersFilter";
import { UsersTable } from "./UsersTable";
import { UserDetailModal } from "./UserDetailModal";

const initialUsers: User[] = [
    {
        id: "U-001",
        name: "Sarah Chen",
        email: "sarah@email.com",
        role: "Client",
        joined: "Jan 2026",
        bookings: 18,
        status: "Active",
    },
    {
        id: "U-002",
        name: "Marcus Webb",
        email: "marcus@cleanspace.co",
        role: "Provider",
        joined: "Dec 2025",
        bookings: 143,
        status: "Active",
    },
    {
        id: "U-003",
        name: "Emma Johnson",
        email: "emma@email.com",
        role: "Client",
        joined: "Feb 2026",
        bookings: 7,
        status: "Active",
    },
    {
        id: "U-004",
        name: "James Wilson",
        email: "james@email.com",
        role: "Client",
        joined: "Mar 2026",
        bookings: 3,
        status: "Suspended",
    },
    {
        id: "U-005",
        name: "Lily Wang",
        email: "lily@refreshhub.co",
        role: "Provider",
        joined: "Nov 2025",
        bookings: 89,
        status: "Active",
    },
    {
        id: "U-006",
        name: "Oliver Brown",
        email: "oliver@email.com",
        role: "Client",
        joined: "Apr 2026",
        bookings: 1,
        status: "Inactive",
    },
];

export function UserManagement() {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeRoleFilter, setActiveRoleFilter] = useState<RoleFilterOption>("All");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Toggle user status between Active & Suspended
    const toggleUserStatus = (userId: string) => {
        setUsers((prev) =>
            prev.map((user) => {
                if (user.id === userId) {
                    const newStatus = user.status === "Active" ? "Suspended" : "Active";
                    return { ...user, status: newStatus };
                }
                return user;
            })
        );
        if (selectedUser && selectedUser.id === userId) {
            setSelectedUser((prev) =>
                prev ? { ...prev, status: prev.status === "Active" ? "Suspended" : "Active" } : null
            );
        }
    };

    // CSV Export Handler
    const handleExportCSV = () => {
        const headers = ["ID", "Name", "Email", "Role", "Joined", "Bookings", "Status"];
        const rows = users.map((u) => [u.id, u.name, u.email, u.role, u.joined, u.bookings, u.status]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `users_export_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter users based on role tab & search string
    const filteredUsers = users.filter((user) => {
        const matchesRole = activeRoleFilter === "All" || user.role === activeRoleFilter;
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <UsersHeader totalUsersCount={users.length} onExportCSV={handleExportCSV} />

            {/* Content Container */}
            <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs space-y-5">
                {/* Search & Role Filters */}
                <UsersFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeRoleFilter={activeRoleFilter}
                    onRoleFilterChange={setActiveRoleFilter}
                />

                {/* Table */}
                <UsersTable
                    users={filteredUsers}
                    onViewUser={(user) => setSelectedUser(user)}
                    onToggleStatus={toggleUserStatus}
                />
            </div>

            {/* View Detail Modal */}
            <UserDetailModal
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                onToggleStatus={toggleUserStatus}
            />
        </div>
    );
}
