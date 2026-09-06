"use client";

import React, { useState } from "react";
import { FAQItem, ContentType } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, FileText } from "lucide-react";

interface ContentModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeTab: ContentType;
    editingItem: FAQItem | null;
    onSave: (titleOrQuestion: string, category: string, answerOrContent: string) => void;
}

export function ContentModal({
    isOpen,
    onClose,
    activeTab,
    editingItem,
    onSave,
}: ContentModalProps) {
    const [titleOrQuestion, setTitleOrQuestion] = useState(editingItem?.question || "");
    const [category, setCategory] = useState(editingItem?.category || "General");
    const [content, setContent] = useState(editingItem?.answer || "");

    if (!isOpen) return null;

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(titleOrQuestion, category, content);
        onClose();
    };

    const isFaq = activeTab === "faq";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 space-y-5 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#088395] text-xs font-semibold uppercase tracking-wider">
                        <FileText className="h-4 w-4" />
                        {isFaq ? "FAQ Entry" : "Policy Document"}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                        {editingItem ? `Edit ${isFaq ? "FAQ" : "Policy"}` : `Create New ${isFaq ? "FAQ" : "Policy"}`}
                    </h3>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            {isFaq ? "Question" : "Document Title"}
                        </label>
                        <Input
                            placeholder={isFaq ? "e.g. How do I book a facility?" : "e.g. Terms of Service"}
                            value={titleOrQuestion}
                            onChange={(e) => setTitleOrQuestion(e.target.value)}
                            className="rounded-xl"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            Category
                        </label>
                        <Input
                            placeholder="e.g. Booking, Payment, Safety, Legal"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-xl"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            {isFaq ? "Answer" : "Policy Content"}
                        </label>
                        <textarea
                            placeholder={isFaq ? "Provide clear step-by-step instructions..." : "Write official policy terms..."}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full min-h-[120px] p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005461]/20 focus:border-[#005461] transition-all resize-y"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-[#005461] hover:bg-[#00424d] text-white rounded-xl">
                            {editingItem ? "Update Content" : "Save Content"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
