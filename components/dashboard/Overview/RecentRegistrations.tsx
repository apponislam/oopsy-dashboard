"use client";

interface UserRegistration {
    name: string;
    role: string;
    date: string;
    status: string;
}

const registrations: UserRegistration[] = [
    { name: "Sarah Chen", role: "Client", date: "24 Aug", status: "Active" },
    { name: "Marcus Webb", role: "Provider", date: "23 Aug", status: "Pending" },
    { name: "Emma Johnson", role: "Client", date: "23 Aug", status: "Active" },
    { name: "James Wilson", role: "Provider", date: "22 Aug", status: "Verified" },
];

export function RecentRegistrations() {
    return (
        <div className="p-6 rounded-2xl bg-white border border-[#005461]/10 shadow-xs">
            <h3 className="text-base font-bold text-[#005461]">Recent Registrations</h3>
            <p className="text-xs text-[#005461]/60 font-medium mt-0.5 pb-4 border-b border-[#005461]/10">
                Latest users joining the platform
            </p>

            <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                            <th className="py-2.5 px-2">Name</th>
                            <th className="py-2.5 px-2">Role</th>
                            <th className="py-2.5 px-2">Date</th>
                            <th className="py-2.5 px-2 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                        {registrations.map((user) => (
                            <tr key={user.name + user.date}>
                                <td className="py-3 px-2 font-bold">{user.name}</td>
                                <td className="py-3 px-2 text-[#005461]/80">{user.role}</td>
                                <td className="py-3 px-2 text-[#005461]/70">{user.date}</td>
                                <td className="py-3 px-2 text-right font-bold">
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] ${
                                            user.status === "Active"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : user.status === "Verified"
                                                ? "bg-[#088395]/15 text-[#005461]"
                                                : "bg-amber-50 text-amber-700"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
