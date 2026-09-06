"use client";

import { Eye } from "lucide-react";
import { Booking } from "./types";

interface BookingsTableProps {
    bookings: Booking[];
    onViewDetails: (booking: Booking) => void;
}

export function BookingsTable({ bookings, onViewDetails }: BookingsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-[#005461]/10 text-[#005461]/60 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">Booking ID</th>
                        <th className="py-3 px-3">Client</th>
                        <th className="py-3 px-3">Facility</th>
                        <th className="py-3 px-3">Date & Time</th>
                        <th className="py-3 px-3">Amount</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#005461]/5 font-medium text-[#005461]">
                    {bookings.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="py-8 text-center text-[#005461]/50 font-semibold">
                                No bookings found.
                            </td>
                        </tr>
                    ) : (
                        bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-[#f0f9fa]/50 transition-colors">
                                <td className="py-3.5 px-3 font-mono font-bold text-[#005461]/70">
                                    {booking.id}
                                </td>
                                <td className="py-3.5 px-3 font-bold text-[#005461]">{booking.client}</td>
                                <td className="py-3.5 px-3 text-[#005461]/80">{booking.facility}</td>
                                <td className="py-3.5 px-3 text-[#005461]/70">{booking.dateTime}</td>
                                <td className="py-3.5 px-3 font-extrabold text-[#005461]">{booking.amount}</td>
                                <td className="py-3.5 px-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            booking.status === "Confirmed"
                                                ? "bg-sky-50 text-sky-700 border border-sky-200"
                                                : booking.status === "Completed"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                : booking.status === "Cancelled"
                                                ? "bg-slate-100 text-slate-600 border border-slate-200"
                                                : "bg-rose-50 text-rose-700 border border-rose-200"
                                        }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-3 text-right">
                                    <button
                                        onClick={() => onViewDetails(booking)}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#E2EFF1] hover:bg-[#005461] hover:text-white text-[#005461] font-bold text-[11px] transition-colors cursor-pointer"
                                    >
                                        <Eye className="w-3 h-3" />
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
