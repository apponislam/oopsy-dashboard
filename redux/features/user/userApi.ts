import { baseApi } from "../../api/baseApi";
import { TUser } from "../auth/authSlice";

export type TUserStats = {
    totalUsers: number;
    totalClients: number;
    totalProviders: number;
    pendingApprovals: number;
    activeUsers: number;
};

export type TUserMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type TGetAllUsersResponse = {
    statusCode: number;
    success: boolean;
    message: string;
    data: TUser[];
    meta: TUserMeta;
    stats?: TUserStats;
};

export type TGetSingleUserResponse = {
    statusCode: number;
    success: boolean;
    message: string;
    data: TUser;
};

export type TUpdateUserStatusPayload = {
    userId: string;
    isActive?: boolean;
    isApproved?: boolean;
    isEmailVerified?: boolean;
};

export type TGetAllUsersParams = {
    page?: number;
    limit?: number;
    searchTerm?: string;
    role?: "ALL" | "CLIENT" | "PROVIDER" | "SUPER_ADMIN" | "ADMIN" | string;
    isActive?: boolean | "ALL" | string;
    isApproved?: boolean | "ALL" | string;
    isEmailVerified?: boolean | "ALL" | string;
    isDeleted?: boolean | string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export const userApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // GET /users - Get all users with search, role, status filters and pagination
        getAllUsers: builder.query<TGetAllUsersResponse, TGetAllUsersParams | void>({
            query: (params) => {
                const searchParams = new URLSearchParams();

                if (params) {
                    Object.entries(params).forEach(([key, value]) => {
                        if (value !== undefined && value !== null && value !== "") {
                            searchParams.append(key, String(value));
                        }
                    });
                }

                const queryString = searchParams.toString();
                return {
                    url: queryString ? `/users?${queryString}` : "/users",
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) =>
                result?.data
                    ? [
                          ...result.data.map(({ _id }) => ({ type: "User" as const, id: _id })),
                          { type: "User", id: "LIST" },
                      ]
                    : [{ type: "User", id: "LIST" }],
        }),

        // GET /users/:userId - Get single user details
        getSingleUser: builder.query<TGetSingleUserResponse, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (_result, _error, userId) => [{ type: "User", id: userId }],
        }),

        // PATCH /users/:userId/status - Update user status (isActive, isApproved, isEmailVerified)
        updateUserStatus: builder.mutation<TGetSingleUserResponse, TUpdateUserStatusPayload>({
            query: ({ userId, ...body }) => ({
                url: `/users/${userId}/status`,
                method: "PATCH",
                body,
                credentials: "include",
            }),
            invalidatesTags: (_result, _error, { userId }) => [
                { type: "User", id: userId },
                { type: "User", id: "LIST" },
            ],
        }),

        // DELETE /users/:userId - Soft delete user
        deleteUser: builder.mutation<
            { statusCode: number; success: boolean; message: string; data: { message: string } },
            string
        >({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (_result, _error, userId) => [
                { type: "User", id: userId },
                { type: "User", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useUpdateUserStatusMutation,
    useDeleteUserMutation,
} = userApi;
