export type ContentType = "faq" | "policies";
export type ContentStatus = "Published" | "Draft";

export interface FAQItem {
    id: string;
    question: string;
    answer?: string;
    category: string;
    status: ContentStatus;
}

export interface PolicyItem {
    id: string;
    title: string;
    category: string;
    lastUpdated: string;
    status: ContentStatus;
}
