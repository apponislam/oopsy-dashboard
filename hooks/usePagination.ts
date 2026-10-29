"use client";

import { useState, useCallback } from "react";

export interface UsePaginationOptions {
    initialPage?: number;
    initialLimit?: number;
}

export function usePagination(options: UsePaginationOptions = {}) {
    const { initialPage = 1, initialLimit = 10 } = options;

    const [page, setPage] = useState<number>(initialPage);
    const [limit, setLimitState] = useState<number>(initialLimit);

    const setLimit = useCallback((newLimit: number) => {
        setLimitState(newLimit);
        setPage(1); // Reset to page 1 when limit changes to prevent out-of-range pages
    }, []);

    const resetPagination = useCallback(() => {
        setPage(initialPage);
        setLimitState(initialLimit);
    }, [initialPage, initialLimit]);

    return {
        page,
        limit,
        setPage,
        setLimit,
        resetPagination,
        queryParams: { page, limit },
    };
}

export default usePagination;
