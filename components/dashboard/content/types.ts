import { IFaq } from "@/redux/features/faq/faqApi";
import { IPolicy, PolicyTypeEnum } from "@/redux/features/public/publicApi";

export type ContentType = "faq" | "policies";

export type { IFaq, IPolicy };
export { PolicyTypeEnum };

export interface PredefinedPolicy {
    type: PolicyTypeEnum;
    defaultTitle: string;
    description: string;
}

export const PREDEFINED_POLICIES: PredefinedPolicy[] = [
    {
        type: PolicyTypeEnum.TERMS_AND_CONDITIONS,
        defaultTitle: "Terms & Conditions",
        description: "General terms and rules governing platform usage, rights, and user conduct.",
    },
    {
        type: PolicyTypeEnum.PRIVACY_POLICY,
        defaultTitle: "Privacy Policy",
        description: "Data collection, privacy compliance, security disclosures, and user rights.",
    },
    {
        type: PolicyTypeEnum.REFUND_POLICY,
        defaultTitle: "Refund Policy",
        description: "Payment disputes, cancellation rules, processing timeframes, and fee handling.",
    },
];
