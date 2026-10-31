"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Search,
    Menu,
    Bell,
    LogOut,
    Settings,
    ShieldCheck,
    Users,
    ChevronDown,
    X,
    ArrowRight,
    CornerDownLeft,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { navigationGroups } from "@/lib/menu";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { performFullLogout } from "@/redux/utils/logout";
import { getImageUrl } from "@/utils/imageUrl";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
    const router = useRouter();
    const user = useAppSelector(currentUser);
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // User menu & modal states
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Refs
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Flatten all dashboard routes from menu navigation groups
    const allRoutes = useMemo(() => {
        return navigationGroups.flatMap((group) =>
            group.items.map((item) => ({
                ...item,
                groupLabel: group.groupLabel,
            }))
        );
    }, []);

    // Filter routes matching user search query
    const filteredRoutes = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            // Show top quick navigation items when query is empty
            return allRoutes;
        }
        return allRoutes.filter(
            (route) =>
                route.title.toLowerCase().includes(query) ||
                route.groupLabel.toLowerCase().includes(query) ||
                route.url.toLowerCase().includes(query)
        );
    }, [allRoutes, searchQuery]);



    // Handle clicks outside search and user menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setIsSearchOpen(false);
            }
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            // Shortcut: Ctrl+K or Cmd+K to focus search
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                searchInputRef.current?.focus();
                setIsSearchOpen(true);
            }
            // Escape to close open dropdowns
            if (event.key === "Escape") {
                setIsSearchOpen(false);
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Navigate to a selected route
    const handleSelectRoute = (url: string) => {
        setIsSearchOpen(false);
        setSearchQuery("");
        router.push(url);
    };

    // Keyboard navigation within search dropdown
    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isSearchOpen || filteredRoutes.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % filteredRoutes.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev === 0 ? filteredRoutes.length - 1 : prev - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            const route = filteredRoutes[selectedIndex];
            if (route) {
                handleSelectRoute(route.url);
            }
        }
    };

    // Handle logout action
    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.error("Server logout error:", error);
        } finally {
            performFullLogout();
            setIsLogoutModalOpen(false);
            setIsUserMenuOpen(false);
            router.replace("/auth/login");
        }
    };

    // User details & avatar
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

    return (
        <header className="relative flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/40 px-6 bg-background transition-[width,height] ease-linear z-30">
            {/* Left section: Sidebar trigger & Route Search input */}
            <div className="flex items-center gap-3 flex-1 max-w-md z-30">
                <SidebarTrigger className="h-9 w-9 p-2.5 rounded-[10px] bg-[#0883951A] text-[#088395] hover:bg-[#0883952A] hover:text-[#088395] transition-colors border-none shrink-0 cursor-pointer">
                    <Menu className="h-4 w-4" />
                </SidebarTrigger>

                {/* Dashboard Routes Search Box */}
                <div ref={searchContainerRef} className="relative flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#005461]/50 pointer-events-none" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onFocus={() => setIsSearchOpen(true)}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setSelectedIndex(0);
                                setIsSearchOpen(true);
                            }}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Search dashboard routes..."
                            className="w-full h-10 pl-9 pr-14 bg-[#E2EFF1]/50 border-none rounded-xl text-sm text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all shadow-2xs"
                        />
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {searchQuery ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery("");
                                        searchInputRef.current?.focus();
                                    }}
                                    className="p-1 rounded-md text-[#005461]/40 hover:text-[#005461] cursor-pointer"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            ) : (
                                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#005461]/50 bg-white/70 rounded-md border border-[#005461]/10">
                                    ⌘K
                                </kbd>
                            )}
                        </div>
                    </div>

                    {/* Routes Autocomplete Dropdown */}
                    {isSearchOpen && (
                        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#005461]/15 shadow-xl overflow-hidden max-h-96 overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150 z-50">
                            <div className="p-2.5 pb-1.5 border-b border-[#005461]/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#005461]/60">
                                <span>
                                    {searchQuery ? `Routes matching "${searchQuery}"` : "Quick Navigation"}
                                </span>
                                <span>{filteredRoutes.length} routes</span>
                            </div>

                            <div className="p-1.5 space-y-0.5">
                                {filteredRoutes.length === 0 ? (
                                    <div className="py-8 text-center text-xs text-[#005461]/50 font-medium">
                                        No dashboard routes found matching &quot;{searchQuery}&quot;
                                    </div>
                                ) : (
                                    filteredRoutes.map((route, index) => {
                                        const isSelected = selectedIndex === index;
                                        const Icon = route.icon;

                                        return (
                                            <button
                                                key={route.url}
                                                type="button"
                                                onClick={() => handleSelectRoute(route.url)}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={cn(
                                                    "w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer group",
                                                    isSelected
                                                        ? "bg-[#005461] text-white"
                                                        : "text-[#005461] hover:bg-[#f0f9fa]"
                                                )}
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div
                                                        className={cn(
                                                            "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                                            isSelected
                                                                ? "bg-white/20 text-white"
                                                                : "bg-[#005461]/10 text-[#005461]"
                                                        )}
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="font-bold truncate">{route.title}</div>
                                                        <div
                                                            className={cn(
                                                                "text-[10px] truncate",
                                                                isSelected
                                                                    ? "text-white/80"
                                                                    : "text-[#005461]/50"
                                                            )}
                                                        >
                                                            {route.groupLabel} · {route.url}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                                    {isSelected ? (
                                                        <CornerDownLeft className="w-3.5 h-3.5 text-white/80" />
                                                    ) : (
                                                        <ArrowRight className="w-3.5 h-3.5 text-[#005461]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Middle section: OOPSY Admin Title (clickable link to home) */}
            <Link
                href="/"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-2.5 text-center group cursor-pointer hover:opacity-90 transition-opacity"
            >
                <span className="h-1.75 w-1.75 rounded-full bg-[#08839559] group-hover:bg-[#005461] transition-colors shrink-0" />
                <span className="text-lg font-extrabold tracking-tight text-[#005461]">
                    OOPSY Admin
                </span>
                <span className="h-1.75 w-1.75 rounded-full bg-[#08839559] group-hover:bg-[#005461] transition-colors shrink-0" />
            </Link>

            {/* Right section: Notifications & Functional Admin User Dropdown */}
            <div className="flex items-center gap-3 sm:gap-4">
                {/* Notification Icon Button */}
                <Link
                    href="/notifications"
                    className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-[#E2EFF1]/60 text-[#005461] hover:bg-[#E2EFF1] transition-colors cursor-pointer shadow-2xs"
                    title="Notifications"
                >
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#005461] ring-2 ring-background" />
                </Link>

                <Separator orientation="vertical" className="h-6 bg-border/60 hidden sm:block" />

                {/* User Profile Menu with Interactive Dropdown */}
                <div ref={userMenuRef} className="relative">
                    <button
                        type="button"
                        onClick={() => setIsUserMenuOpen((prev) => !prev)}
                        className="flex items-center gap-2.5 p-1 sm:pr-2.5 rounded-xl hover:bg-[#f0f9fa] border border-transparent hover:border-[#005461]/10 transition-all cursor-pointer text-left"
                    >
                        {/* Avatar */}
                        {avatarUrl ? (
                            <div className="relative h-9 w-9 rounded-full overflow-hidden border border-[#005461]/20 shadow-2xs shrink-0">
                                <Image
                                    src={avatarUrl}
                                    alt={displayName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#005461] text-white text-xs font-bold shadow-2xs shrink-0">
                                {initials}
                            </div>
                        )}

                        {/* Name and Email */}
                        <div className="hidden sm:flex flex-col text-left max-w-35 truncate">
                            <span className="text-xs font-bold text-[#005461] truncate">
                                {displayName}
                            </span>
                            <span className="text-[10px] text-muted-foreground truncate">
                                {displayEmail}
                            </span>
                        </div>

                        <ChevronDown
                            className={cn(
                                "w-3.5 h-3.5 text-[#005461]/60 transition-transform duration-200 hidden sm:block",
                                isUserMenuOpen && "rotate-180 text-[#005461]"
                            )}
                        />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isUserMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-[#005461]/15 shadow-2xl p-2 animate-in fade-in-50 zoom-in-95 duration-150 z-50">
                            {/* Profile Header Summary */}
                            <div className="p-3 bg-[#f0f9fa] rounded-xl border border-[#005461]/5 space-y-1 mb-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#005461] truncate">
                                        {displayName}
                                    </span>
                                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-[#005461]/10 text-[#005461]">
                                        {displayRole}
                                    </span>
                                </div>
                                <p className="text-[11px] text-[#005461]/70 truncate">{displayEmail}</p>
                            </div>

                            {/* Navigation Links */}
                            <div className="space-y-0.5">
                                <Link
                                    href="/settings"
                                    onClick={() => setIsUserMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#005461] hover:bg-[#f0f9fa] transition-colors"
                                >
                                    <Settings className="w-3.5 h-3.5" />
                                    <span>Settings & Profile</span>
                                </Link>

                                <Link
                                    href="/verification"
                                    onClick={() => setIsUserMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#005461] hover:bg-[#f0f9fa] transition-colors"
                                >
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>Verification Queue</span>
                                </Link>

                                <Link
                                    href="/users"
                                    onClick={() => setIsUserMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#005461] hover:bg-[#f0f9fa] transition-colors"
                                >
                                    <Users className="w-3.5 h-3.5" />
                                    <span>User Management</span>
                                </Link>
                            </div>

                            <div className="h-px bg-[#005461]/10 my-1" />

                            {/* Logout Action */}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsUserMenuOpen(false);
                                    setIsLogoutModalOpen(true);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <ConfirmModal
                isOpen={isLogoutModalOpen}
                title="Sign Out"
                variant="danger"
                confirmText="Sign Out"
                cancelText="Cancel"
                isLoading={isLoggingOut}
                onConfirm={handleLogout}
                onClose={() => setIsLogoutModalOpen(false)}
                description={
                    <div className="space-y-1.5">
                        <p>Are you sure you want to sign out of the OOPSY admin console?</p>
                        <p className="text-[#005461]/70">
                            You will need to enter your credentials to access the dashboard again.
                        </p>
                    </div>
                }
            />
        </header>
    );
}

export default DashboardHeader;
