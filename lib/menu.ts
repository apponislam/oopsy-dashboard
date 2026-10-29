import { LayoutDashboard, Users, Building2, ShieldCheck, MapPin, CalendarCheck, CreditCard, Percent, Wallet, Star, Flag, HelpCircle, ShieldAlert, Grid, FileText, Bell, Settings } from "lucide-react";
import React from "react";

export interface MenuItem {
    title: string;
    url: string;
    icon: React.ElementType;
    badge?: number;
}

export interface MenuGroup {
    groupLabel: string;
    items: MenuItem[];
}

export const navigationGroups: MenuGroup[] = [
    {
        groupLabel: "Overview",
        items: [
            {
                title: "Dashboard",
                url: "/",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        groupLabel: "People",
        items: [
            {
                title: "Users",
                url: "/users",
                icon: Users,
            },
            {
                title: "Providers",
                url: "/providers",
                icon: Building2,
            },
            {
                title: "Verification",
                url: "/verification",
                icon: ShieldCheck,
            },
        ],
    },
    {
        groupLabel: "Operations",
        items: [
            {
                title: "Listings",
                url: "/listings",
                icon: MapPin,
            },
            {
                title: "Bookings",
                url: "/bookings",
                icon: CalendarCheck,
            },
        ],
    },
    {
        groupLabel: "Finance",
        items: [
            {
                title: "Payments",
                url: "/payments",
                icon: CreditCard,
            },
            {
                title: "Commissions",
                url: "/commissions",
                icon: Percent,
            },
            {
                title: "Payouts",
                url: "/payouts",
                icon: Wallet,
            },
        ],
    },
    {
        groupLabel: "Moderation",
        items: [
            {
                title: "Reviews",
                url: "/reviews",
                icon: Star,
            },
            {
                title: "Reports",
                url: "/reports",
                icon: Flag,
            },
            {
                title: "Assistance",
                url: "/assistance",
                icon: HelpCircle,
            },
            {
                title: "Safety",
                url: "/safety",
                icon: ShieldAlert,
            },
        ],
    },
    {
        groupLabel: "Platform",
        items: [
            {
                title: "Categories",
                url: "/categories",
                icon: Grid,
            },
            {
                title: "Content",
                url: "/content",
                icon: FileText,
            },
            {
                title: "Notifications",
                url: "/notifications",
                icon: Bell,
            },
            {
                title: "Settings",
                url: "/settings",
                icon: Settings,
            },
        ],
    },
];
