"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Smile } from "lucide-react";

interface AddCategoryFormProps {
    onAddCategory: (name: string, icon: string) => void;
}

export function AddCategoryForm({ onAddCategory }: AddCategoryFormProps) {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("🧊");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAddCategory(name, icon || "🧊");
        setName("");
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
                        <span>Emoji Icon</span>
                        <Smile className="h-3.5 w-3.5 text-gray-400" />
                    </label>
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="🧊"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            className="rounded-xl border-gray-200 text-center text-xl w-16"
                            maxLength={4}
                            required
                        />
                        <div className="flex-1 flex items-center px-3 text-xs text-gray-400 bg-gray-50 rounded-xl border border-gray-100">
                            Paste or select an emoji for visual representation
                        </div>
                    </div>
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
