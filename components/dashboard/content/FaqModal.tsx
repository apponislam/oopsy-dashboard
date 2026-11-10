"use client";

import React, { useState, useEffect } from "react";
import { IFaq } from "@/redux/features/faq/faqApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, HelpCircle, Loader2 } from "lucide-react";

interface FaqModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingFaq: IFaq | null;
    onSubmit: (data: { question: string; answer: string }) => Promise<boolean>;
    isSubmitting: boolean;
}

export function FaqModal({
    isOpen,
    onClose,
    editingFaq,
    onSubmit,
    isSubmitting,
}: FaqModalProps) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (editingFaq) {
            setQuestion(editingFaq.question || "");
            setAnswer(editingFaq.answer || "");
        } else {
            setQuestion("");
            setAnswer("");
        }
        setError(null);
    }, [editingFaq, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const trimmedQuestion = question.trim();
        const trimmedAnswer = answer.trim();

        if (!trimmedQuestion) {
            setError("Question is required");
            return;
        }
        if (!trimmedAnswer) {
            setError("Answer is required");
            return;
        }

        const success = await onSubmit({ question: trimmedQuestion, answer: trimmedAnswer });
        if (success) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
            <div
                className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 relative animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#088395] text-xs font-semibold uppercase tracking-wider">
                        <HelpCircle className="h-4 w-4" />
                        <span>FAQ Management</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                        {editingFaq ? "Edit FAQ" : "Create New FAQ"}
                    </h3>
                    <p className="text-xs text-gray-500">
                        {editingFaq
                            ? "Update the question and answer for users and providers."
                            : "Add a new frequently asked question and answer."}
                    </p>
                </div>

                {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            Question <span className="text-rose-500">*</span>
                        </label>
                        <Input
                            placeholder="e.g. How do I book a facility?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="rounded-xl"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block">
                            Answer <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            placeholder="Provide a clear, detailed answer or instructions..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            rows={5}
                            className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005461]/20 focus:border-[#005461] transition-all resize-y"
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="rounded-xl cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#005461] hover:bg-[#00424d] text-white rounded-xl gap-2 cursor-pointer"
                        >
                            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                            {editingFaq ? "Update FAQ" : "Save FAQ"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

