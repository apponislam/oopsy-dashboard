"use client";

import React from "react";
import { ICategory } from "@/redux/features/category/categoryApi";
import { getImageUrl } from "@/utils/imageUrl";
import Image from "next/image";
import {
    Layers,
    Edit2,
    Trash2,
    Loader2,
    FolderKanban,
    Calendar,
    Hash,
} from "lucide-react";
import { Pagination, TMeta } from "@/components/ui/pagination";

interface CategoryListProps {
    categories: ICategory[];
    isLoading: boolean;
    updatingStatusId: string | null;
    onToggleStatus: (category: ICategory) => void;
    onEditCategory: (category: ICategory) => void;
    onDeleteCategory: (category: ICategory) => void;
    meta?: TMeta;
    onPageChange: (page: number) => void;
    onLimitChange?: (limit: number) => void;
}

export function CategoryList({
    categories,
    isLoading,
    updatingStatusId,
    onToggleStatus,
    onEditCategory,
    onDeleteCategory,
    meta,
    onPageChange,
    onLimitChange,
}: CategoryListProps) {
    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl border border-[#005461]/10 p-6 space-y-5 shadow-xs">
                <div className="flex items-center justify-between">
                    <div className="h-5 w-32 bg-[#005461]/10 rounded-lg animate-pulse" />
                    <div className="h-4 w-20 bg-[#005461]/10 rounded-lg animate-pulse" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-28 rounded-xl border border-[#005461]/10 bg-[#f0f9fa]/50 p-4 animate-pulse flex items-center gap-4"
                        >
                            <div className="w-14 h-14 rounded-xl bg-[#005461]/15 shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-[#005461]/15 rounded w-3/4" />
                                <div className="h-3 bg-[#005461]/10 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const totalCount = meta?.total ?? categories.length;

    return (
        <div className="bg-white rounded-2xl border border-[#005461]/10 p-6 space-y-5 shadow-xs">
            {/* Header info */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-base font-extrabold text-[#005461]">
                        Facility Categories
                    </h2>
                    <p className="text-xs text-[#005461]/60 font-medium">
                        {totalCount} {totalCount === 1 ? "category" : "categories"} registered
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {categories.length === 0 ? (
                <div className="py-16 px-4 text-center border-2 border-dashed border-[#005461]/15 rounded-2xl bg-[#f0f9fa]/40 flex flex-col items-center justify-center gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-[#005461]/10 text-[#005461] flex items-center justify-center">
                        <FolderKanban className="h-7 w-7" />
                    </div>
                    <div className="max-w-xs space-y-1">
                        <h3 className="font-bold text-sm text-[#005461]">No Categories Found</h3>
                        <p className="text-xs text-[#005461]/60">
                            No service categories matched your query. Add your first category using the form on the right.
                        </p>
                    </div>
                </div>
            ) : (
                /* Cards Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categories.map((cat) => {
                        const isActive = cat.isActive !== false;
                        const isUpdating = updatingStatusId === cat._id;
                        const imageUrl = cat.image ? getImageUrl(cat.image) : null;
                        const createdDate = cat.createdAt
                            ? new Date(cat.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                              })
                            : null;

                        return (
                            <div
                                key={cat._id}
                                className={`flex flex-col justify-between p-4 rounded-xl border transition-all duration-200 ${
                                    isActive
                                        ? "bg-white border-[#005461]/15 hover:border-[#005461]/40 hover:shadow-xs"
                                        : "bg-gray-50/70 border-gray-200/80 opacity-75"
                                }`}
                            >
                                <div className="flex items-start gap-3.5">
                                    {/* Thumbnail Image */}
                                    <div className="w-14 h-14 rounded-xl bg-[#f0f9fa] border border-[#005461]/15 flex items-center justify-center shadow-2xs shrink-0 overflow-hidden relative">
                                        {imageUrl ? (
                                            <Image
                                                src={imageUrl}
                                                alt={cat.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <Layers className="w-6 h-6 text-[#005461]/50" />
                                        )}
                                    </div>

                                    {/* Content Info */}
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-extrabold text-[#005461] text-sm truncate">
                                                {cat.name}
                                            </h3>
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                                                    isActive
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                        : "bg-gray-100 text-gray-600 border border-gray-200"
                                                }`}
                                            >
                                                {isActive ? "Active" : "Inactive"}
                                            </span>
                                        </div>

                                        {cat.slug && (
                                            <p className="text-[11px] text-[#005461]/60 flex items-center gap-1 font-mono truncate">
                                                <Hash className="w-3 h-3 shrink-0 text-[#005461]/40" />
                                                <span>{cat.slug}</span>
                                            </p>
                                        )}

                                        {createdDate && (
                                            <p className="text-[10px] text-[#005461]/50 flex items-center gap-1 font-medium">
                                                <Calendar className="w-3 h-3 shrink-0" />
                                                <span>{createdDate}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Bottom Action Strip */}
                                <div className="mt-3.5 pt-2.5 border-t border-[#005461]/10 flex items-center justify-between gap-2">
                                    {/* Active Switch */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={isActive}
                                            disabled={isUpdating}
                                            onClick={() => onToggleStatus(cat)}
                                            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-60 ${
                                                isActive ? "bg-[#005461]" : "bg-gray-200"
                                            }`}
                                            title={isActive ? "Deactivate category" : "Activate category"}
                                        >
                                            <span
                                                className={`pointer-events-none inline-flex items-center justify-center h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                                    isActive ? "translate-x-5" : "translate-x-0"
                                                }`}
                                            >
                                                {isUpdating && (
                                                    <Loader2 className="w-2.5 h-2.5 text-[#005461] animate-spin" />
                                                )}
                                            </span>
                                        </button>
                                        <span className="text-[11px] font-semibold text-[#005461]/70">
                                            {isActive ? "Enabled" : "Disabled"}
                                        </span>
                                    </div>

                                    {/* Edit / Delete Buttons */}
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => onEditCategory(cat)}
                                            className="p-1.5 rounded-lg text-[#005461]/70 hover:text-[#005461] hover:bg-[#005461]/10 transition-colors cursor-pointer"
                                            title="Edit Category"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onDeleteCategory(cat)}
                                            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                                            title="Delete Category"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination Component */}
            {meta && meta.totalPages && meta.totalPages > 1 ? (
                <div className="pt-2 border-t border-[#005461]/10">
                    <Pagination
                        meta={meta}
                        onPageChange={onPageChange}
                        onLimitChange={onLimitChange}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default CategoryList;
