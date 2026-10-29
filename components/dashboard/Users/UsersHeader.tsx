"use client";

interface UsersHeaderProps {
    totalUsersCount?: number;
}

export function UsersHeader({}: UsersHeaderProps = {}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-[#005461]">User Management</h1>
                <p className="text-xs text-[#005461]/70 font-medium mt-0.5">
                    Manage client and provider accounts, monitor activity, and configure permissions.
                </p>
            </div>
        </div>
    );
}
