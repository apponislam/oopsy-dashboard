"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, Check, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type TMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
};

export interface PaginationProps {
    meta?: TMeta;
    onPageChange: (page: number) => void;
    onLimitChange?: (limit: number) => void;
    limitOptions?: number[];
    showLimitSelector?: boolean;
    showSummary?: boolean;
    showFirstLastButtons?: boolean;
    siblingCount?: number;
    className?: string;
}

const DOTS = "...";

function generatePaginationRange(currentPage: number, totalPages: number, siblingCount = 1): (number | string)[] {
    const totalPageNumbers = siblingCount * 2 + 5; // siblingCount + first + last + current + 2*dots

    if (totalPageNumbers >= totalPages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
        return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);
        return [1, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
        return [1, DOTS, ...middleRange, DOTS, totalPages];
    }

    return [];
}

/**
 * Custom Animated Dropdown for Rows per page
 */
function RowsPerPageDropdown({ value, options, onChange }: { value: number; options: number[]; onChange: (val: number) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-[#005461]/20 bg-white text-[#005461] font-semibold text-xs hover:border-[#005461]/40 hover:bg-[#E2EFF1]/40 focus:outline-none focus:ring-2 focus:ring-[#005461]/20 transition-all cursor-pointer shadow-2xs"
            >
                <span>{value}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 text-[#005461]/70 transition-transform duration-200", isOpen && "rotate-180 text-[#005461]")} />
            </button>

            {isOpen && (
                <div role="listbox" className="absolute bottom-full mb-1.5 left-0 z-50 min-w-19.5 rounded-xl border border-[#005461]/15 bg-white p-1 text-[#005461] shadow-lg ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95">
                    {options.map((opt) => {
                        const isSelected = opt === value;
                        return (
                            <button
                                key={opt}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                    onChange(opt);
                                    setIsOpen(false);
                                }}
                                className={cn("flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left", isSelected ? "bg-[#005461] text-white" : "text-[#005461]/80 hover:bg-[#E2EFF1] hover:text-[#005461]")}
                            >
                                <span>{opt}</span>
                                {isSelected && <Check className="h-3 w-3 shrink-0 stroke-[2.5]" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export function Pagination({ meta, onPageChange, onLimitChange, limitOptions = [10, 20, 50, 100], showLimitSelector = true, showSummary = true, showFirstLastButtons = true, siblingCount = 1, className }: PaginationProps) {
    const page = meta?.page ?? 1;
    const limit = meta?.limit ?? 10;
    const total = meta?.total ?? 0;
    const totalPages = meta?.totalPages ?? Math.max(1, Math.ceil(total / (limit || 10)));

    const hasPrev = meta?.hasPrev !== undefined ? meta.hasPrev : page > 1;
    const hasNext = meta?.hasNext !== undefined ? meta.hasNext : page < totalPages;

    const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    const paginationRange = useMemo(() => generatePaginationRange(page, totalPages, siblingCount), [page, totalPages, siblingCount]);

    if (total === 0 && !meta) {
        return null;
    }

    return (
        <div className={cn("flex flex-col md:flex-row items-center justify-between gap-4 py-3 px-1 text-xs text-[#005461]/80 select-none w-full", className)}>
            {/* Top on Mobile / Left on Desktop: Summary & Custom Rows Per Page Dropdown */}
            <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-4 w-full md:w-auto font-medium">
                {showSummary && (
                    <span className="text-xs">
                        Showing <span className="font-bold text-[#005461]">{startItem}</span> to <span className="font-bold text-[#005461]">{endItem}</span> of <span className="font-bold text-[#005461]">{total}</span> entries
                    </span>
                )}

                {showLimitSelector && onLimitChange && (
                    <div className="flex items-center gap-2">
                        <span className="text-[#005461]/60">Rows per page:</span>
                        <RowsPerPageDropdown value={limit} options={limitOptions} onChange={onLimitChange} />
                    </div>
                )}
            </div>

            {/* Bottom on Mobile / Right on Desktop: Navigation Controls */}
            <div className="flex items-center justify-center sm:justify-end gap-1 sm:gap-1.5 w-full md:w-auto">
                {/* First Page Button (hidden on extra small screens for compact mobile layout) */}
                {showFirstLastButtons && (
                    <button
                        type="button"
                        onClick={() => onPageChange(1)}
                        disabled={!hasPrev}
                        title="First page"
                        aria-label="First page"
                        className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#005461]/20 bg-white text-[#005461] hover:bg-[#E2EFF1] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </button>
                )}

                {/* Previous Page Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(page - 1)}
                    disabled={!hasPrev}
                    title="Previous page"
                    aria-label="Previous page"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#005461]/20 bg-white text-[#005461] hover:bg-[#E2EFF1] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Mobile View: Compact Current Page Indicator (visible only on < 640px) */}
                <div className="flex sm:hidden items-center px-2.5 h-8 rounded-lg bg-[#005461]/10 text-[#005461] font-bold text-xs">
                    Page {page} of {totalPages}
                </div>

                {/* Desktop & Tablet: Full Numbered Buttons with Smart Ellipsis (visible on sm: and up) */}
                <div className="hidden sm:flex items-center gap-1">
                    {paginationRange.map((item, index) => {
                        if (item === DOTS) {
                            return (
                                <span key={`dots-${index}`} className="flex h-8 w-7 items-center justify-center text-[#005461]/50">
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                </span>
                            );
                        }

                        const pageNumber = Number(item);
                        const isCurrent = pageNumber === page;

                        return (
                            <button
                                key={`page-${pageNumber}`}
                                type="button"
                                onClick={() => onPageChange(pageNumber)}
                                aria-current={isCurrent ? "page" : undefined}
                                className={cn("inline-flex h-8 min-w-8 px-2 items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs", isCurrent ? "bg-[#005461] text-white shadow-xs" : "bg-white text-[#005461] border border-[#005461]/20 hover:bg-[#E2EFF1]")}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>

                {/* Next Page Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!hasNext}
                    title="Next page"
                    aria-label="Next page"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#005461]/20 bg-white text-[#005461] hover:bg-[#E2EFF1] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>

                {/* Last Page Button (hidden on extra small screens for compact mobile layout) */}
                {showFirstLastButtons && (
                    <button
                        type="button"
                        onClick={() => onPageChange(totalPages)}
                        disabled={!hasNext}
                        title="Last page"
                        aria-label="Last page"
                        className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#005461]/20 bg-white text-[#005461] hover:bg-[#E2EFF1] disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Pagination;
