"use client";

import React from "react";
import { Layers } from "lucide-react";

export function CategoriesHeader() {
    return (
        <div className="pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#088395]">
                <Layers className="h-4 w-4" />
                <span>Platform</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">Service Categories</h1>
            <p className="text-sm text-gray-500 mt-0.5">
                Manage facility types available on the platform
            </p>
        </div>
    );
}
