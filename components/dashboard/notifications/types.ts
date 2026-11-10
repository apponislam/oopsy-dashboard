import { INotification, NotificationType, TargetAudience } from "@/redux/features/notification/notificationApi";

export type AudienceType = "All" | "Clients" | "Providers";

export interface SentNotification {
    id: string;
    title: string;
    message?: string;
    audience: AudienceType;
    date: string;
    recipientsCount: number;
    openRate?: string;
    type?: string;
}

export { NotificationType };
export type { INotification, TargetAudience };
