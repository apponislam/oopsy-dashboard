import { baseApi } from "../../api/baseApi";
import { TUser } from "./authSlice";

export type AuthResponse = {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        user: TUser;
        accessToken: string;
    };
};

export type RefreshTokenResponse = {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        user: TUser;
        accessToken: string;
    };
};

export type VerifyOtpResponse = {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        token: string;
    };
};

export type ApiResponse<T = any> = {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
};

const authApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // === Authentication ===
        login: builder.mutation<AuthResponse, { email: string; password: string }>({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),

        register: builder.mutation<AuthResponse, FormData | Record<string, any>>({
            query: (userInfo) => ({
                url: "/auth/register",
                method: "POST",
                body: userInfo,
                credentials: "include",
            }),
        }),

        refreshToken: builder.mutation<RefreshTokenResponse, void>({
            query: () => ({
                url: "/auth/refresh-token",
                method: "POST",
                credentials: "include",
            }),
        }),

        logout: builder.mutation<ApiResponse<null>, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),

        getMe: builder.query<ApiResponse<TUser>, void>({
            query: () => ({
                url: "/auth/me",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["User"],
        }),

        // === Email Verification ===
        verifyEmail: builder.query<ApiResponse<null>, { email: string; token?: string; otp?: string }>({
            query: ({ email, token, otp }) => ({
                url: "/auth/verify-email",
                method: "GET",
                params: { email, ...(token && { token }), ...(otp && { otp }) },
            }),
        }),

        resendVerificationEmail: builder.mutation<ApiResponse<null>, { email: string }>({
            query: (body) => ({
                url: "/auth/resend-verification",
                method: "POST",
                body,
            }),
        }),

        // === Password Reset (Forgot Password) ===
        requestPasswordReset: builder.mutation<ApiResponse<null>, { email: string }>({
            query: (body) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body,
            }),
        }),

        verifyOtp: builder.mutation<VerifyOtpResponse, { email: string; otp: string }>({
            query: (body) => ({
                url: "/auth/verify-otp",
                method: "POST",
                body,
            }),
        }),

        resendOtp: builder.mutation<ApiResponse<null>, { email: string }>({
            query: (body) => ({
                url: "/auth/resend-otp",
                method: "POST",
                body,
            }),
        }),

        resetPassword: builder.mutation<ApiResponse<null>, { token: string; newPassword: string }>({
            query: (body) => ({
                url: "/auth/reset-password",
                method: "POST",
                body,
            }),
        }),

        // === Profile & Account Management ===
        updateProfile: builder.mutation<ApiResponse<TUser>, FormData | Record<string, any>>({
            query: (data) => ({
                url: "/auth/profile",
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),

        changePassword: builder.mutation<ApiResponse<null>, { currentPassword: string; newPassword: string }>({
            query: (body) => ({
                url: "/auth/change-password",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),

        deleteAccount: builder.mutation<ApiResponse<{ message: string }>, { password: string }>({
            query: (body) => ({
                url: "/auth/delete-account",
                method: "DELETE",
                body,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),

        // === Email Update ===
        updateEmail: builder.mutation<ApiResponse<null>, { email: string; password: string }>({
            query: (body) => ({
                url: "/auth/update-email",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),

        resendEmailUpdate: builder.mutation<ApiResponse<null>, { password: string }>({
            query: (body) => ({
                url: "/auth/resend-email-update",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),

        verifyNewEmail: builder.query<ApiResponse<null>, { token: string; email: string }>({
            query: ({ token, email }) => ({
                url: "/auth/verify-new-email",
                method: "GET",
                params: { token, email },
            }),
        }),

        // === Admin / Super Admin User Management ===
        getUserById: builder.query<ApiResponse<TUser>, string>({
            query: (userId) => ({
                url: `/auth/users/${userId}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (_result, _error, userId) => [{ type: "User", id: userId }],
        }),

        setUserPassword: builder.mutation<ApiResponse<null>, { userId: string; password: string }>({
            query: ({ userId, password }) => ({
                url: `/auth/set-password/${userId}`,
                method: "POST",
                body: { password },
                credentials: "include",
            }),
        }),

        updateUserBySuperAdmin: builder.mutation<ApiResponse<TUser>, { userId: string; body: FormData | Record<string, any> }>({
            query: ({ userId, body }) => ({
                url: `/auth/users/${userId}`,
                method: "PATCH",
                body,
                credentials: "include",
            }),
            invalidatesTags: (_result, _error, { userId }) => [
                "User",
                { type: "User", id: userId },
            ],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
    useGetMeQuery,
    useVerifyEmailQuery,
    useResendVerificationEmailMutation,
    useRequestPasswordResetMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useResetPasswordMutation,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useDeleteAccountMutation,
    useUpdateEmailMutation,
    useResendEmailUpdateMutation,
    useVerifyNewEmailQuery,
    useGetUserByIdQuery,
    useSetUserPasswordMutation,
    useUpdateUserBySuperAdminMutation,
} = authApi;
