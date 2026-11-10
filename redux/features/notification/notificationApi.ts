import { baseApi } from "../../api/baseApi";

export enum NotificationType {
    REVIEW_ADDED = "REVIEW_ADDED",
    REVIEW_REPLIED = "REVIEW_REPLIED",
    BOOKING_CREATED = "BOOKING_CREATED",
    BOOKING_STATUS_CHANGED = "BOOKING_STATUS_CHANGED",
    SYSTEM_ALERT = "SYSTEM_ALERT",
    GENERAL = "GENERAL",
}

export type TargetAudience = "ALL" | "CLIENT" | "PROVIDER" | "SELECTED";

export interface INotificationSender {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
    role?: string;
}

export interface INotification {
    _id: string;
    receiver: string;
    sender?: INotificationSender;
    type: NotificationType | string;
    title: string;
    message: string;
    data?: Record<string, any>;
    isRead: boolean;
    isDeleted?: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface TNotificationQueryParams {
    page?: number;
    limit?: number;
    isRead?: boolean | string;
}

export interface TNotificationResponse {
    statusCode?: number;
    success: boolean;
    message: string;
    data: INotification[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    stats?: {
        unreadCount: number;
    };
}

export interface TBroadcastPayload {
    target: TargetAudience;
    targetUserIds?: string[];
    title: string;
    message: string;
    type?: NotificationType | string;
    data?: Record<string, any>;
}

export interface TBroadcastResponse {
    statusCode?: number;
    success: boolean;
    message: string;
    data: {
        recipientCount: number;
        message: string;
    };
}

export const notificationApi = baseApi.enhanceEndpoints({ addTagTypes: ["Notification"] }).injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // GET /notifications - User/Admin notifications list
        getUserNotifications: builder.query<TNotificationResponse, TNotificationQueryParams | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.page) queryParams.append("page", String(params.page));
                if (params?.limit) queryParams.append("limit", String(params.limit));
                if (params?.isRead !== undefined && params?.isRead !== "") {
                    queryParams.append("isRead", String(params.isRead));
                }

                const queryString = queryParams.toString();
                return {
                    url: queryString ? `/notifications?${queryString}` : "/notifications",
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["Notification"],
        }),

        // POST /notifications/admin/send - Super Admin broadcast notification
        sendAdminBroadcast: builder.mutation<TBroadcastResponse, TBroadcastPayload>({
            query: (body) => ({
                url: "/notifications/admin/send",
                method: "POST",
                body,
                credentials: "include",
            }),
            invalidatesTags: ["Notification"],
        }),

        // PATCH /notifications/:id/read - Mark single notification as read
        markAsRead: builder.mutation<{ success: boolean; message: string; data: INotification }, string>({
            query: (id) => ({
                url: `/notifications/${id}/read`,
                method: "PATCH",
                credentials: "include",
            }),
            invalidatesTags: ["Notification"],
        }),

        // PATCH /notifications/mark-all-read - Mark all notifications as read
        markAllAsRead: builder.mutation<{ success: boolean; message: string; data: null }, void>({
            query: () => ({
                url: "/notifications/mark-all-read",
                method: "PATCH",
                credentials: "include",
            }),
            invalidatesTags: ["Notification"],
        }),

        // DELETE /notifications/:id - Delete single notification
        deleteNotification: builder.mutation<{ success: boolean; message: string; data: null }, string>({
            query: (id) => ({
                url: `/notifications/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Notification"],
        }),

        // DELETE /notifications/clear-all - Clear all notifications
        clearAllNotifications: builder.mutation<{ success: boolean; message: string; data: null }, void>({
            query: () => ({
                url: "/notifications/clear-all",
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Notification"],
        }),
    }),
});

export const { useGetUserNotificationsQuery, useSendAdminBroadcastMutation, useMarkAsReadMutation, useMarkAllAsReadMutation, useDeleteNotificationMutation, useClearAllNotificationsMutation } = notificationApi;
