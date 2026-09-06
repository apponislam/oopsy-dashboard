"use client";

import React from "react";
import { ServiceCategory } from "./types";

interface CategoryListProps {
    categories: ServiceCategory[];
    onToggleCategory?: (id: string) => void;
}

export function CategoryList({
    categories,
    onToggleCategory,
}: CategoryListProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">All Categories</h2>
                    <p className="text-xs text-gray-500">{categories.length} types available</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => {
                    const isActive = cat.isActive !== false;
                    return (
                        <div
                            key={cat.id}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                                isActive
                                    ? "bg-slate-50/50 border-gray-100 hover:border-[#088395]/30 hover:shadow-xs"
                                    : "bg-gray-50/40 border-gray-100 opacity-60"
                            }`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                                {cat.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-gray-900 text-sm truncate">{cat.name}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">{cat.listingsCount} listings</p>
                            </div>
                            {onToggleCategory && (
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={isActive}
                                    onClick={() => onToggleCategory(cat.id)}
                                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                        isActive ? "bg-[#088395]" : "bg-gray-200"
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                            isActive ? "translate-x-4" : "translate-x-0"
                                        }`}
                                    />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
