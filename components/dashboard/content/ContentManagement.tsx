"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ContentType, PolicyTypeEnum, IFaq, IPolicy } from "./types";
import { ContentHeader } from "./ContentHeader";
import { FAQTable } from "./FAQTable";
import { PolicyTable } from "./PolicyTable";
import { FaqModal } from "./FaqModal";
import { PolicyModal } from "./PolicyModal";
import { PolicyViewModal } from "./PolicyViewModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import {
    useGetFaqsQuery,
    useCreateFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation,
} from "@/redux/features/faq/faqApi";
import {
    useGetPolicyByTypeQuery,
    useUpsertPolicyMutation,
} from "@/redux/features/public/publicApi";
import { HelpCircle, ShieldCheck, CheckCircle2, AlertTriangle, X } from "lucide-react";

export function ContentManagement() {
    const [activeTab, setActiveTab] = useState<ContentType>("faq");

    // Search & pagination state for FAQs
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1);
        }, 350);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // RTK Query for FAQs
    const {
        data: faqResponse,
        isLoading: isFaqsLoading,
    } = useGetFaqsQuery({
        searchTerm: debouncedSearch,
        page,
        limit,
    });

    const [createFaqMutation, { isLoading: isCreatingFaq }] = useCreateFaqMutation();
    const [updateFaqMutation, { isLoading: isUpdatingFaq }] = useUpdateFaqMutation();
    const [deleteFaqMutation, { isLoading: isDeletingFaq }] = useDeleteFaqMutation();

    // RTK Query for Policies
    const termsQuery = useGetPolicyByTypeQuery(PolicyTypeEnum.TERMS_AND_CONDITIONS);
    const privacyQuery = useGetPolicyByTypeQuery(PolicyTypeEnum.PRIVACY_POLICY);
    const refundQuery = useGetPolicyByTypeQuery(PolicyTypeEnum.REFUND_POLICY);

    const [upsertPolicyMutation, { isLoading: isSavingPolicy }] = useUpsertPolicyMutation();

    // Modals & Action States
    const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<IFaq | null>(null);
    const [deleteFaqItem, setDeleteFaqItem] = useState<IFaq | null>(null);

    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
    const [editingPolicyType, setEditingPolicyType] = useState<PolicyTypeEnum | null>(null);
    const [editingPolicyTitle, setEditingPolicyTitle] = useState("");
    const [editingPolicyContent, setEditingPolicyContent] = useState("");

    const [viewingPolicy, setViewingPolicy] = useState<IPolicy | null>(null);
    const [viewingPolicyDefaultTitle, setViewingPolicyDefaultTitle] = useState("");

    // Toast feedback notification
    const [feedbackNotice, setFeedbackNotice] = useState<{
        message: string;
        type: "success" | "warning";
    } | null>(null);

    const showFeedback = (message: string, type: "success" | "warning" = "success") => {
        setFeedbackNotice({ message, type });
        setTimeout(() => {
            setFeedbackNotice((curr) => (curr?.message === message ? null : curr));
        }, 3500);
    };

    // Policies aggregated state
    const policiesState = useMemo(() => {
        return {
            [PolicyTypeEnum.TERMS_AND_CONDITIONS]: {
                policy: termsQuery.data?.data,
                isLoading: termsQuery.isLoading,
                isNotFound: !termsQuery.isLoading && !termsQuery.data?.data,
            },
            [PolicyTypeEnum.PRIVACY_POLICY]: {
                policy: privacyQuery.data?.data,
                isLoading: privacyQuery.isLoading,
                isNotFound: !privacyQuery.isLoading && !privacyQuery.data?.data,
            },
            [PolicyTypeEnum.REFUND_POLICY]: {
                policy: refundQuery.data?.data,
                isLoading: refundQuery.isLoading,
                isNotFound: !refundQuery.isLoading && !refundQuery.data?.data,
            },
        };
    }, [termsQuery, privacyQuery, refundQuery]);

    // Active live policy count
    const livePolicyCount = useMemo(() => {
        let count = 0;
        if (termsQuery.data?.data) count++;
        if (privacyQuery.data?.data) count++;
        if (refundQuery.data?.data) count++;
        return count;
    }, [termsQuery.data, privacyQuery.data, refundQuery.data]);

    // FAQ Handlers
    const handleOpenCreateFaq = () => {
        setEditingFaq(null);
        setIsFaqModalOpen(true);
    };

    const handleOpenEditFaq = (faq: IFaq) => {
        setEditingFaq(faq);
        setIsFaqModalOpen(true);
    };

    const handleFaqSubmit = async (data: { question: string; answer: string }): Promise<boolean> => {
        try {
            if (editingFaq) {
                await updateFaqMutation({
                    id: editingFaq._id,
                    data,
                }).unwrap();
                showFeedback("FAQ updated successfully!", "success");
            } else {
                await createFaqMutation(data).unwrap();
                showFeedback("FAQ created successfully!", "success");
            }
            return true;
        } catch (error: unknown) {
            console.error("Failed to save FAQ:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg = errObj?.data?.message || errObj?.error || "Failed to save FAQ. Please check admin permissions.";
            showFeedback(errMsg, "warning");
            return false;
        }
    };

    const handleConfirmDeleteFaq = async () => {
        if (!deleteFaqItem) return;
        try {
            await deleteFaqMutation(deleteFaqItem._id).unwrap();
            showFeedback("FAQ deleted successfully!", "success");
            setDeleteFaqItem(null);
        } catch (error: unknown) {
            console.error("Failed to delete FAQ:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg = errObj?.data?.message || errObj?.error || "Failed to delete FAQ.";
            showFeedback(errMsg, "warning");
        }
    };

    // Policy Handlers
    const handleOpenEditPolicy = (
        type: PolicyTypeEnum,
        defaultTitle: string,
        currentContent: string
    ) => {
        setEditingPolicyType(type);
        setEditingPolicyTitle(defaultTitle);
        setEditingPolicyContent(currentContent);
        setIsPolicyModalOpen(true);
    };

    const handleOpenViewPolicy = (type: PolicyTypeEnum, defaultTitle: string) => {
        const item = policiesState[type]?.policy || null;
        setViewingPolicy(item);
        setViewingPolicyDefaultTitle(defaultTitle);
    };

    const handlePolicySubmit = async (data: {
        type: PolicyTypeEnum;
        title: string;
        content: string;
    }): Promise<boolean> => {
        try {
            await upsertPolicyMutation(data).unwrap();
            showFeedback(`${data.title} saved successfully!`, "success");
            return true;
        } catch (error: unknown) {
            console.error("Failed to save policy:", error);
            const errObj = error as { data?: { message?: string }; error?: string };
            const errMsg = errObj?.data?.message || errObj?.error || "Failed to save policy document.";
            showFeedback(errMsg, "warning");
            return false;
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Feedback notification toast */}
            {feedbackNotice && (
                <div
                    className={`fixed bottom-6 right-6 z-60 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200 ${
                        feedbackNotice.type === "success"
                            ? "bg-emerald-600 text-white"
                            : "bg-amber-600 text-white"
                    }`}
                >
                    {feedbackNotice.type === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                    )}
                    <span>{feedbackNotice.message}</span>
                    <button
                        onClick={() => setFeedbackNotice(null)}
                        className="p-1 hover:bg-black/10 rounded-lg ml-1"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}

            {/* Header */}
            <ContentHeader
                activeTab={activeTab}
                onCreateFaq={handleOpenCreateFaq}
            />

            {/* Tabs */}
            <div className="flex border-b border-gray-200 gap-6">
                <button
                    onClick={() => setActiveTab("faq")}
                    className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                        activeTab === "faq"
                            ? "border-[#005461] text-[#005461]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <HelpCircle className="h-4 w-4" />
                    <span>Frequently Asked Questions</span>
                    <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-teal-50 text-[#005461] font-bold">
                        {faqResponse?.meta?.total ?? faqResponse?.data?.length ?? 0}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab("policies")}
                    className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                        activeTab === "policies"
                            ? "border-[#005461] text-[#005461]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Policies & Legal</span>
                    <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-teal-50 text-[#005461] font-bold">
                        {livePolicyCount}/3 Live
                    </span>
                </button>
            </div>

            {/* Content Body */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
                {activeTab === "faq" ? (
                    <FAQTable
                        items={faqResponse?.data ?? []}
                        isLoading={isFaqsLoading}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onEdit={handleOpenEditFaq}
                        onDelete={setDeleteFaqItem}
                        meta={faqResponse?.meta}
                        onPageChange={setPage}
                        onCreateNew={handleOpenCreateFaq}
                    />
                ) : (
                    <PolicyTable
                        policiesState={policiesState}
                        onEdit={handleOpenEditPolicy}
                        onView={handleOpenViewPolicy}
                    />
                )}
            </div>

            {/* FAQ Create / Edit Modal */}
            <FaqModal
                isOpen={isFaqModalOpen}
                onClose={() => setIsFaqModalOpen(false)}
                editingFaq={editingFaq}
                onSubmit={handleFaqSubmit}
                isSubmitting={isCreatingFaq || isUpdatingFaq}
            />

            {/* Policy Edit Modal */}
            <PolicyModal
                isOpen={isPolicyModalOpen}
                onClose={() => setIsPolicyModalOpen(false)}
                policyType={editingPolicyType}
                defaultTitle={editingPolicyTitle}
                initialContent={editingPolicyContent}
                onSubmit={handlePolicySubmit}
                isSubmitting={isSavingPolicy}
            />

            {/* Policy View Modal */}
            <PolicyViewModal
                isOpen={!!viewingPolicy}
                onClose={() => setViewingPolicy(null)}
                policy={viewingPolicy}
                defaultTitle={viewingPolicyDefaultTitle}
                onEdit={() => {
                    if (viewingPolicy?.type) {
                        handleOpenEditPolicy(
                            viewingPolicy.type as PolicyTypeEnum,
                            viewingPolicy.title,
                            viewingPolicy.content
                        );
                    }
                }}
            />

            {/* Delete FAQ Confirm Modal */}
            <ConfirmModal
                isOpen={!!deleteFaqItem}
                title="Delete FAQ"
                description={
                    <span>
                        Are you sure you want to delete the FAQ:{" "}
                        <strong className="text-gray-900">&ldquo;{deleteFaqItem?.question}&rdquo;</strong>?
                        This action cannot be undone.
                    </span>
                }
                confirmText="Delete FAQ"
                variant="danger"
                isLoading={isDeletingFaq}
                onConfirm={handleConfirmDeleteFaq}
                onClose={() => setDeleteFaqItem(null)}
            />
        </div>
    );
}
