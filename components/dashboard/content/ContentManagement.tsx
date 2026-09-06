"use client";

import React, { useState } from "react";
import { FAQItem, PolicyItem, ContentType } from "./types";
import { ContentHeader } from "./ContentHeader";
import { FAQTable } from "./FAQTable";
import { PolicyTable } from "./PolicyTable";
import { ContentModal } from "./ContentModal";
import { HelpCircle, ShieldCheck } from "lucide-react";

const initialFaqs: FAQItem[] = [
    {
        id: "faq-1",
        question: "How do I book a facility?",
        category: "Booking",
        status: "Published",
        answer: "Select your desired facility on the map or list, pick an available time slot, and proceed through instant checkout.",
    },
    {
        id: "faq-2",
        question: "Can I cancel my booking?",
        category: "Booking",
        status: "Published",
        answer: "Yes, bookings can be cancelled up to 15 minutes before the reservation start time for a full refund.",
    },
    {
        id: "faq-3",
        question: "How are payments processed?",
        category: "Payment",
        status: "Published",
        answer: "All transactions are securely processed via encrypted payment gateways supporting major credit cards & digital wallets.",
    },
    {
        id: "faq-4",
        question: "What if a facility is not as described?",
        category: "Safety",
        status: "Draft",
        answer: "Report the issue immediately via the Safety Assistance tab within 30 minutes of arrival.",
    },
];

const initialPolicies: PolicyItem[] = [
    {
        id: "pol-1",
        title: "Platform Terms of Service",
        category: "Legal",
        lastUpdated: "2026-08-15",
        status: "Published",
    },
    {
        id: "pol-2",
        title: "Privacy & Data Protection Policy",
        category: "Privacy",
        lastUpdated: "2026-08-20",
        status: "Published",
    },
    {
        id: "pol-3",
        title: "Facility Provider Guidelines",
        category: "Provider",
        lastUpdated: "2026-09-01",
        status: "Published",
    },
    {
        id: "pol-4",
        title: "Refund & Dispute Resolution Policy",
        category: "Booking",
        lastUpdated: "2026-09-05",
        status: "Draft",
    },
];

export function ContentManagement() {
    const [activeTab, setActiveTab] = useState<ContentType>("faq");
    const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
    const [policies, setPolicies] = useState<PolicyItem[]>(initialPolicies);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<FAQItem | null>(null);

    const handleCreateNew = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEditFaq = (item: FAQItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleToggleFaqStatus = (id: string) => {
        setFaqs((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, status: item.status === "Published" ? "Draft" : "Published" }
                    : item
            )
        );
    };

    const handleEditPolicy = (item: PolicyItem) => {
        // Map policy into FAQ format for modal convenience
        setEditingItem({
            id: item.id,
            question: item.title,
            category: item.category,
            status: item.status,
            answer: "",
        });
        setIsModalOpen(true);
    };

    const handleTogglePolicyStatus = (id: string) => {
        setPolicies((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, status: item.status === "Published" ? "Draft" : "Published" }
                    : item
            )
        );
    };

    const handleSaveContent = (titleOrQuestion: string, category: string, answerOrContent: string) => {
        if (activeTab === "faq") {
            if (editingItem) {
                setFaqs((prev) =>
                    prev.map((f) =>
                        f.id === editingItem.id
                            ? { ...f, question: titleOrQuestion, category, answer: answerOrContent }
                            : f
                    )
                );
            } else {
                setFaqs((prev) => [
                    ...prev,
                    {
                        id: `faq-${Date.now()}`,
                        question: titleOrQuestion,
                        category,
                        answer: answerOrContent,
                        status: "Published",
                    },
                ]);
            }
        } else {
            if (editingItem) {
                setPolicies((prev) =>
                    prev.map((p) =>
                        p.id === editingItem.id
                            ? { ...p, title: titleOrQuestion, category }
                            : p
                    )
                );
            } else {
                setPolicies((prev) => [
                    ...prev,
                    {
                        id: `pol-${Date.now()}`,
                        title: titleOrQuestion,
                        category,
                        lastUpdated: new Date().toISOString().split("T")[0],
                        status: "Published",
                    },
                ]);
            }
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto min-h-screen">
            <ContentHeader onCreateNew={handleCreateNew} />

            {/* Tab navigation bar */}
            <div className="flex border-b border-gray-200 gap-6">
                <button
                    onClick={() => setActiveTab("faq")}
                    className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                        activeTab === "faq"
                            ? "border-[#005461] text-[#005461]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <HelpCircle className="h-4 w-4" />
                    <span>FAQ</span>
                    <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-teal-50 text-[#005461] font-bold">
                        {faqs.length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab("policies")}
                    className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                        activeTab === "policies"
                            ? "border-[#005461] text-[#005461]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Policies</span>
                    <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-teal-50 text-[#005461] font-bold">
                        {policies.length}
                    </span>
                </button>
            </div>

            {/* Content Table Container */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
                {activeTab === "faq" ? (
                    <FAQTable
                        items={faqs}
                        onEdit={handleEditFaq}
                        onToggleStatus={handleToggleFaqStatus}
                    />
                ) : (
                    <PolicyTable
                        items={policies}
                        onEdit={handleEditPolicy}
                        onToggleStatus={handleTogglePolicyStatus}
                    />
                )}
            </div>

            {/* Create / Edit Modal */}
            <ContentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                activeTab={activeTab}
                editingItem={editingItem}
                onSave={handleSaveContent}
            />
        </div>
    );
}
