"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DashboardHeader() {
    return (
        <header className="relative flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/40 px-6 bg-background transition-[width,height] ease-linear">
            {/* Left section: Sidebar trigger & Search input */}
            <div className="flex items-center gap-3 flex-1 max-w-md z-10">
                <SidebarTrigger className="h-9 w-9 p-2.5 rounded-[10px] bg-[#0883951A] text-[#088395] hover:bg-[#0883952A] hover:text-[#088395] transition-colors border-none shrink-0">
                    <Menu className="h-4 w-4" />
                </SidebarTrigger>
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#005461]/50" />
                    <Input type="search" placeholder="Search listings, users, bookings..." className="h-10 pl-9 pr-4 bg-[#E2EFF1]/50 border-none rounded-xl text-sm text-[#005461] placeholder:text-[#005461]/40 focus-visible:ring-[#005461]" />
                </div>
            </div>

            {/* Middle section: OOPSY Admin Title */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:flex items-center gap-2.5 text-center">
                <span className="h-1.75 w-1.75 rounded-full bg-[#08839559] shrink-0" />
                <span className="text-lg font-extrabold tracking-tight text-[#005461]">OOPSY Admin</span>
                <span className="h-1.75 w-1.75 rounded-full bg-[#08839559] shrink-0" />
            </div>

            {/* Right section: Notifications & Admin User Badge */}
            <div className="flex items-center gap-4">
                {/* Notification Icon Button */}
                <Link href="/notifications" className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-[#E2EFF1]/60 text-[#005461] hover:bg-[#E2EFF1] transition-colors">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#005461] ring-2 ring-background" />
                </Link>

                <Separator orientation="vertical" className="h-6 bg-border/60 hidden sm:block" />

                {/* User Profile Info */}
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#005461] text-white text-xs font-bold shadow-sm">AD</div>
                    <div className="hidden sm:flex flex-col text-left">
                        <span className="text-xs font-bold text-[#005461]">Admin Console</span>
                        <span className="text-[10px] text-muted-foreground">admin@elivapp.com</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
