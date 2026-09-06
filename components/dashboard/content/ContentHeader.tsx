"use client";

import React from "react";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentHeaderProps {
    onCreateNew: () => void;
}

export function ContentHeader({ onCreateNew }: ContentHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-100">
            <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#088395]">
                    <FileText className="h-4 w-4" />
                    <span>Platform</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">Content Management</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    FAQs, policies, and platform documents
                </p>
            </div>
            <div>
                <Button
                    onClick={onCreateNew}
                    className="bg-[#005461] hover:bg-[#00424d] text-white gap-2 font-medium shadow-xs rounded-xl"
                >
                    <Plus className="h-4 w-4" />
                    Create New
                </Button>
            </div>
        </div>
    );
}
