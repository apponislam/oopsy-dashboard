"use client";

import React, { useState, useEffect, useRef } from "react";
import { ICategory } from "@/redux/features/category/categoryApi";
import { X, Upload, Loader2, Edit3, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/utils/imageUrl";

interface EditCategoryModalProps {
    isOpen: boolean;
    category: ICategory | null;
    onClose: () => void;
    onUpdateCategory: (id: string, formData: FormData) => Promise<boolean>;
    isUpdating: boolean;
}

function EditCategoryDialog({
    category,
    onClose,
    onUpdateCategory,
    isUpdating,
}: {
    category: ICategory;
    onClose: () => void;
    onUpdateCategory: (id: string, formData: FormData) => Promise<boolean>;
    isUpdating: boolean;
}) {
    const [name, setName] = useState(category.name || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        category.image ? getImageUrl(category.image) : null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isUpdating) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isUpdating, onClose]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image file.");
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const formData = new FormData();
        formData.append("name", name.trim());
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        const success = await onUpdateCategory(category._id, formData);
        if (success) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => {
                if (!isUpdating) onClose();
            }}
        >
            <div
                className="bg-white rounded-2xl border border-[#005461]/15 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-5 pb-3 flex items-center justify-between border-b border-[#005461]/10">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">
                            <Edit3 className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-extrabold text-[#005461]">
                                Edit Category
                            </h3>
                            <p className="text-xs text-[#005461]/60 font-medium">
                                Update category title or thumbnail
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isUpdating}
                        className="h-8 w-8 rounded-lg bg-gray-50 hover:bg-gray-100 text-[#005461]/60 hover:text-[#005461] flex items-center justify-center transition-colors cursor-pointer border border-[#005461]/10 disabled:opacity-50"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="p-5 space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#005461] block">
                                Category Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isUpdating}
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#f0f9fa] border border-[#005461]/15 text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all font-medium disabled:opacity-60"
                                required
                            />
                        </div>

                        {/* Image Preview & Upload */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#005461]">
                                <span>Category Thumbnail</span>
                                <ImageIcon className="h-3.5 w-3.5 text-[#005461]/50" />
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                disabled={isUpdating}
                                className="hidden"
                            />

                            {previewUrl ? (
                                <div className="relative w-full h-36 rounded-xl border border-[#005461]/20 overflow-hidden bg-[#f0f9fa] flex items-center justify-center group shadow-2xs">
                                    <Image
                                        src={previewUrl}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-3 py-1.5 rounded-lg bg-white text-[#005461] text-xs font-bold shadow-xs cursor-pointer hover:bg-gray-100"
                                        >
                                            Change Photo
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-32 border-2 border-dashed border-[#005461]/20 hover:border-[#005461] rounded-xl flex flex-col items-center justify-center p-3 cursor-pointer bg-[#f0f9fa]/50 hover:bg-[#f0f9fa] transition-all text-center gap-1.5"
                                >
                                    <Upload className="h-5 w-5 text-[#005461]" />
                                    <span className="font-bold text-xs text-[#005461]">
                                        Upload New Photo
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-[#f0f9fa]/70 border-t border-[#005461]/10 flex items-center justify-end gap-2.5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isUpdating}
                            className="px-4 py-2 rounded-xl bg-white hover:bg-gray-100 text-[#005461] font-semibold text-xs border border-[#005461]/20 transition-colors cursor-pointer disabled:opacity-50 shadow-2xs"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isUpdating || !name.trim()}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#005461] hover:bg-[#00424d] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span>Updating...</span>
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function EditCategoryModal({
    isOpen,
    category,
    onClose,
    onUpdateCategory,
    isUpdating,
}: EditCategoryModalProps) {
    if (!isOpen || !category) return null;

    return (
        <EditCategoryDialog
            key={category._id}
            category={category}
            onClose={onClose}
            onUpdateCategory={onUpdateCategory}
            isUpdating={isUpdating}
        />
    );
}

export default EditCategoryModal;
