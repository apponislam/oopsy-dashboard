"use client";

import React, { useState, useRef } from "react";
import { PlusCircle, Upload, Image as ImageIcon, X, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";

interface AddCategoryFormProps {
    onCreateCategory: (formData: FormData) => Promise<boolean>;
    isSubmitting: boolean;
}

export function AddCategoryForm({
    onCreateCategory,
    isSubmitting,
}: AddCategoryFormProps) {
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file (PNG, JPG, WebP, SVG).");
            return;
        }
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
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

        const success = await onCreateCategory(formData);
        if (success) {
            setName("");
            handleRemoveFile();
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-[#005461]/10 p-6 space-y-5 shadow-xs sticky top-6">
            <div className="flex items-center gap-3 pb-3 border-b border-[#005461]/10">
                <div className="h-10 w-10 rounded-xl bg-[#005461]/10 text-[#005461] flex items-center justify-center shrink-0">
                    <PlusCircle className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="text-base font-extrabold text-[#005461]">Add Category</h2>
                    <p className="text-xs text-[#005461]/60 font-medium">
                        Create a new service facility type
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4.5">
                {/* Category Name */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#005461] block">
                        Category Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Restroom, Shower, Jacuzzi..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#f0f9fa] border border-[#005461]/15 text-[#005461] placeholder:text-[#005461]/40 focus:outline-none focus:ring-1 focus:ring-[#005461] focus:bg-white transition-all font-medium disabled:opacity-60"
                        required
                    />
                </div>

                {/* Category Image Upload */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#005461]">
                        <span>Category Photo / Icon</span>
                        <ImageIcon className="h-3.5 w-3.5 text-[#005461]/50" />
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        disabled={isSubmitting}
                        className="hidden"
                    />

                    {previewUrl ? (
                        <div className="relative w-full h-44 rounded-xl border border-[#005461]/20 overflow-hidden bg-[#f0f9fa] flex items-center justify-center group shadow-2xs">
                            <Image
                                src={previewUrl}
                                alt="Category Preview"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-[#005461] text-[11px] font-bold shadow-xs cursor-pointer"
                                >
                                    Change
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemoveFile}
                                    className="p-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer"
                                    title="Remove Image"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all text-center gap-2 group ${
                                dragActive
                                    ? "border-[#005461] bg-[#005461]/10 scale-[0.99]"
                                    : "border-[#005461]/20 hover:border-[#005461] bg-[#f0f9fa]/50 hover:bg-[#f0f9fa]"
                            }`}
                        >
                            <div className="p-2.5 bg-white rounded-xl border border-[#005461]/15 shadow-2xs text-[#005461] group-hover:scale-105 transition-transform">
                                <Upload className="h-5 w-5" />
                            </div>
                            <div className="space-y-0.5">
                                <span className="font-bold text-xs text-[#005461] block leading-tight">
                                    Click to upload or drag &amp; drop
                                </span>
                                <span className="text-[10px] text-[#005461]/60 block leading-tight">
                                    PNG, JPG, WebP, or SVG (processed to WebP)
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || !name.trim()}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#005461] hover:bg-[#00424d] text-white font-bold text-xs transition-all cursor-pointer shadow-xs disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Creating Category...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4" />
                            <span>Create Category</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default AddCategoryForm;
