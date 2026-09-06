"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Upload, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface AddCategoryFormProps {
    onAddCategory: (name: string, icon: string) => void;
}

export function AddCategoryForm({ onAddCategory }: AddCategoryFormProps) {
    const [name, setName] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAddCategory(name, imagePreview || "/location.svg");
        setName("");
        handleRemoveImage();
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-xs sticky top-6">
            <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#f0f9fa] text-[#088395]">
                    <PlusCircle className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Add Category</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                        Name
                    </label>
                    <Input
                        type="text"
                        placeholder="e.g. Steam Room"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-xl border-gray-200"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 flex items-center justify-between">
                        <span>Category Icon / Image</span>
                        <ImageIcon className="h-3.5 w-3.5 text-gray-400" />
                    </label>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {imagePreview ? (
                        <div className="relative w-40 h-40 mx-auto rounded-xl border border-gray-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                            <Image
                                src={imagePreview}
                                alt="Category Preview"
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white p-1.5 rounded-full transition-colors z-10"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    ) : (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-40 h-40 mx-auto border-2 border-dashed border-gray-200 hover:border-[#088395] rounded-xl flex flex-col items-center justify-center p-3 cursor-pointer bg-slate-50/50 hover:bg-[#f0f9fa]/50 transition-all text-center gap-2 group"
                        >
                            <div className="p-2.5 bg-white rounded-xl border border-gray-200/80 shadow-2xs text-[#088395] group-hover:scale-105 transition-transform">
                                <Upload className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="font-semibold text-xs text-gray-800 block leading-tight">
                                    Upload Photo / Icon
                                </span>
                                <span className="text-[10px] text-gray-400 block leading-tight px-1">
                                    PNG, JPG, WebP or SVG (max 2MB)
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-[#005461] hover:bg-[#00424d] text-white rounded-xl py-5 gap-2 font-medium shadow-xs mt-2"
                >
                    <PlusCircle className="h-4 w-4" />
                    Add Category
                </Button>
            </form>
        </div>
    );
}
