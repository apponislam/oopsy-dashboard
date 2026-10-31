import { baseApi } from "../../api/baseApi";

export type TSystemSettings = {
    _id?: string;
    supportEmail: string;
    defaultCommissionPercentage: number;
    maxAdvanceBookingDays: number;
    emailNotifications: boolean;
    pushNotifications: boolean;
    allowNewRegistrations: boolean;
    autoApproveReviews: boolean;
    maintenanceMode: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export type TGetSettingsResponse = {
    statusCode: number;
    success: boolean;
    message: string;
    data: TSystemSettings;
};

export const settingsApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // GET /settings - Retrieve system settings
        getSettings: builder.query<TGetSettingsResponse, void>({
            query: () => ({
                url: "/settings",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Setting"],
        }),

        // PATCH /settings - Update system settings (Super Admin)
        updateSettings: builder.mutation<TGetSettingsResponse, Partial<TSystemSettings>>({
            query: (body) => ({
                url: "/settings",
                method: "PATCH",
                body,
                credentials: "include",
            }),
            invalidatesTags: ["Setting"],
        }),
    }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
