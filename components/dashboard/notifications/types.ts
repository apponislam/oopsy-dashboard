export type AudienceType = "All" | "Clients" | "Providers";

export interface SentNotification {
    id: string;
    title: string;
    audience: AudienceType;
    date: string;
    recipientsCount: number;
    openRate: string;
}
