"use client";

import * as React from "react";
import {
    LayoutDashboard,
    AlertTriangle,
    BarChart3,
    Settings,
    Users,
    Bell,
    ChevronDown,
    LogOut,
    HelpCircle,
    UserCheck
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
    {
        title: "Overview",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Incidents & Oopsies",
        url: "/incidents",
        icon: AlertTriangle,
    },
    {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
    },
    {
        title: "Team Members",
        url: "/team",
        icon: Users,
    },
];

const secondaryItems = [
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
    {
        title: "Help & Support",
        url: "/support",
        icon: HelpCircle,
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="offcanvas" className="border-r border-border/40" {...props}>
            <SidebarHeader className="h-14 border-b border-border/40 px-4 justify-center">
                <Link href="/" className="flex items-center gap-3 font-semibold group-data-[collapsible=icon]:justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500 ring-1 ring-red-500/20">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                        <span className="text-sm font-bold tracking-tight text-foreground">Oopsy</span>
                        <span className="text-[10px] font-medium text-muted-foreground">Incident Tracker</span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-2 py-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                        Dashboard
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={item.title}
                                            className={isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground"}
                                            render={
                                                <Link href={item.url}>
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            }
                                        />
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                        System
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondaryItems.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={item.title}
                                            className={isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground"}
                                            render={
                                                <Link href={item.url}>
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            }
                                        />
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border/40 p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            tooltip="User Profile"
                            className="w-full justify-start gap-3 hover:bg-accent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center"
                            render={
                                <div className="flex items-center gap-3 w-full">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">
                                        JD
                                    </div>
                                    <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden overflow-hidden">
                                        <span className="text-xs font-medium truncate text-foreground">John Doe</span>
                                        <span className="text-[10px] text-muted-foreground truncate">john@oopsy.dev</span>
                                    </div>
                                </div>
                            }
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
