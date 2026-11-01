"use client";

import React, { useState, useEffect } from "react";
import {
    ICategory,
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useToggleCategoryStatusMutation,
    useDeleteCategoryMutation,
} from "@/redux/features/category/categoryApi";
import { CategoriesHeader } from "./CategoriesHeader";
import { CategoryList } from "./CategoryList";
import { AddCategoryForm } from "./AddCategoryForm";
import { EditCategoryModal } from "./EditCategoryModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

export function CategoriesManagement() {
    // Search, Filter & Pagination states
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1); // reset to first page on search
        }, 350);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Reset page on status filter change
    const handleStatusFilterChange = (val: string) => {
        setStatusFilter(val);
        setPage(1);
    };

    // RTK Query hooks
    const { data: response, isLoading } = useGetCategoriesQuery({
        searchTerm: debouncedSearch,
        isActive: statusFilter === "" ? undefined : statusFilter === "true",
        page,
        limit,
    });

    const [createCategoryMutation, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategoryMutation, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const [toggleCategoryStatusMutation] = useToggleCategoryStatusMutation();
    const [deleteCategoryMutation, { isLoading: isDeleting }] = useDeleteCategoryMutation();

    // Modals and action states
    const [editCategory, setEditCategory] = useState<ICategory | null>(null);
    const [deleteCategoryItem, setDeleteCategoryItem] = useState<ICategory | null>(null);
    const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

    // Feedback toast notification
    const [feedbackNotice, setFeedbackNotice] = useState<{
        message: string;
        type: "success" | "warning";
    } | null>(null);

    const showFeedback = (message: string, type: "success" | "warning" = "success") => {
        setFeedbackNotice({ message, type });
        setTimeout(() => {
            setFeedbackNotice((curr) => (curr?.message === message ? null : curr));
        }, 3000);
    };

    // Handle Create Category
    const handleCreateCategory = async (formData: FormData): Promise<boolean> => {
        try {
            await createCategoryMutation(formData).unwrap();
            showFeedback("Category created successfully!", "success");
            return true;
        } catch (error: unknown) {
            console.error("Failed to create category:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg =
                errObj?.data?.message ||
                errObj?.error ||
                "Failed to create category. Please check your admin privileges.";
            showFeedback(errMsg, "warning");
            return false;
        }
    };

    // Handle Update Category
    const handleUpdateCategory = async (id: string, formData: FormData): Promise<boolean> => {
        try {
            await updateCategoryMutation({ id, data: formData }).unwrap();
            showFeedback("Category updated successfully!", "success");
            setEditCategory(null);
            return true;
        } catch (error: unknown) {
            console.error("Failed to update category:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg =
                errObj?.data?.message ||
                errObj?.error ||
                "Failed to update category. Please try again.";
            showFeedback(errMsg, "warning");
            return false;
        }
    };

    // Handle Status Toggle Switch
    const handleToggleStatus = async (cat: ICategory) => {
        setUpdatingStatusId(cat._id);
        try {
            const res = await toggleCategoryStatusMutation(cat._id).unwrap();
            const newStatus = res?.data?.isActive ? "enabled" : "disabled";
            showFeedback(`"${cat.name}" has been ${newStatus}.`, "success");
        } catch (error: unknown) {
            console.error("Failed to toggle category status:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg =
                errObj?.data?.message ||
                errObj?.error ||
                "Failed to toggle status. Please check your permissions.";
            showFeedback(errMsg, "warning");
        } finally {
            setUpdatingStatusId(null);
        }
    };

    // Handle Delete Confirmation
    const handleConfirmDelete = async () => {
        if (!deleteCategoryItem) return;
        try {
            await deleteCategoryMutation(deleteCategoryItem._id).unwrap();
            showFeedback(`Category "${deleteCategoryItem.name}" deleted successfully.`, "success");
            setDeleteCategoryItem(null);
        } catch (error: unknown) {
            console.error("Failed to delete category:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg =
                errObj?.data?.message ||
                errObj?.error ||
                "Failed to delete category. Please try again.";
            showFeedback(errMsg, "warning");
        }
    };

    const categories = response?.data ?? [];
    const meta = response?.meta;

    // Derived metric counts
    const totalCount = meta?.total ?? categories.length;
    const activeCount = categories.filter((c) => c.isActive !== false).length;
    const inactiveCount = categories.filter((c) => c.isActive === false).length;

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-375 mx-auto min-h-screen">
            {/* Feedback Alert */}
            {feedbackNotice && (
                <div
                    className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
                        feedbackNotice.type === "success"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-amber-50 border-amber-200 text-amber-900"
                    }`}
                >
                    <div className="flex items-center gap-2 font-bold">
                        {feedbackNotice.type === "success" ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                        )}
                        <span>{feedbackNotice.message}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setFeedbackNotice(null)}
                        className="p-1 rounded-md hover:bg-black/5 cursor-pointer"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}

            {/* Header */}
            <CategoriesHeader
                totalCount={totalCount}
                activeCount={activeCount}
                inactiveCount={inactiveCount}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={handleStatusFilterChange}
            />

            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left 2 Cols: Category List */}
                <div className="lg:col-span-2">
                    <CategoryList
                        categories={categories}
                        isLoading={isLoading}
                        updatingStatusId={updatingStatusId}
                        onToggleStatus={handleToggleStatus}
                        onEditCategory={(cat) => setEditCategory(cat)}
                        onDeleteCategory={(cat) => setDeleteCategoryItem(cat)}
                        meta={meta}
                        onPageChange={setPage}
                        onLimitChange={(newLimit) => {
                            setLimit(newLimit);
                            setPage(1);
                        }}
                    />
                </div>

                {/* Right 1 Col: Add Category Form */}
                <div className="lg:col-span-1">
                    <AddCategoryForm
                        onCreateCategory={handleCreateCategory}
                        isSubmitting={isCreating}
                    />
                </div>
            </div>

            {/* Edit Category Modal */}
            <EditCategoryModal
                isOpen={Boolean(editCategory)}
                category={editCategory}
                onClose={() => setEditCategory(null)}
                onUpdateCategory={handleUpdateCategory}
                isUpdating={isUpdating}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={Boolean(deleteCategoryItem)}
                title="Delete Service Category"
                variant="danger"
                confirmText="Delete Category"
                cancelText="Cancel"
                isLoading={isDeleting}
                onConfirm={handleConfirmDelete}
                onClose={() => {
                    if (!isDeleting) setDeleteCategoryItem(null);
                }}
                description={
                    <div className="space-y-1.5">
                        <p>
                            Are you sure you want to delete{" "}
                            <strong>&ldquo;{deleteCategoryItem?.name}&rdquo;</strong>?
                        </p>
                        <p className="text-rose-700 font-semibold">
                            ⚠️ This category will be deactivated and removed from the active service directory.
                        </p>
                    </div>
                }
            />
        </div>
    );
}

export default CategoriesManagement;
