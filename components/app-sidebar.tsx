"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationGroups } from "@/lib/menu";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";

import { LogOut } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="offcanvas" className="border-r border-border/40 shadow-[4px_0px_12px_0px_#08839512]" style={{ boxShadow: "4px 0px 12px 0px #08839512" }} {...props}>
            {/* Header */}
            <SidebarHeader className="h-16 border-b border-border/40 px-4 justify-center">
                <Link href="/" className="flex items-center gap-2 font-semibold group-data-[collapsible=icon]:justify-center">
                    <Image src="/location.svg" alt="Oopsy Logo" width={30} height={30} />

                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                        <span className="font-bold tracking-tight text-[#005461] text-xl">OOPSY</span>
                    </div>
                </Link>
            </SidebarHeader>

            {/* Content Groups from lib/menu.ts */}
            <SidebarContent className="px-3 py-2 space-y-4">
                {navigationGroups.map((group) => (
                    <SidebarGroup key={group.groupLabel} className="p-0">
                        <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-wider text-[#005461]/60 px-2 py-1">{group.groupLabel}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive = pathname === item.url;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                isActive={isActive}
                                                data-active={isActive}
                                                tooltip={item.title}
                                                className={
                                                    isActive
                                                        ? "bg-[#005461]! text-white! font-semibold hover:bg-[#005461]! hover:text-white! data-[active=true]:bg-[#005461]! data-[active=true]:text-white! rounded-lg"
                                                        : "text-[#005461]/80 hover:bg-[#E2EFF1] hover:text-[#005461] rounded-lg transition-colors"
                                                }
                                                render={
                                                    <Link href={item.url} className="flex items-center gap-3 w-full">
                                                        <item.icon className="h-4 w-4 shrink-0" />
                                                        <span className="flex-1 truncate">{item.title}</span>
                                                        {item.badge !== undefined && (
                                                            <SidebarMenuBadge
                                                                className={isActive ? "bg-white/20 text-white font-semibold text-[11px] px-2 py-0.5 rounded-full border border-white/30" : "bg-[#005461]/10 text-[#005461] font-semibold text-[11px] px-2 py-0.5 rounded-full border border-[#005461]/20"}
                                                            >
                                                                {item.badge}
                                                            </SidebarMenuBadge>
                                                        )}
                                                    </Link>
                                                }
                                            />
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* Footer Profile Card with Integrated Bottom Logout Button */}
            <SidebarFooter className="border-t border-border/40 p-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex flex-col gap-3 w-full p-3 bg-[#005461] text-white rounded-xl shadow-sm">
                            {/* Top: User Avatar & Info */}
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white text-xs font-bold shrink-0">AD</div>
                                <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden overflow-hidden">
                                    <span className="text-xs font-bold truncate">Admin Console</span>
                                    <span className="text-[11px] text-white/80 truncate">admin@elivapp.com</span>
                                </div>
                            </div>

                            {/* Bottom: Icon + Log Out Button */}
                            <Link href="/auth/login" className="flex items-center justify-center gap-2 w-full py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors group-data-[collapsible=icon]:hidden">
                                <LogOut className="h-3.5 w-3.5" />
                                <span>Log Out</span>
                            </Link>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
