import { baseApi } from "../../api/baseApi";

export enum PolicyTypeEnum {
    TERMS_AND_CONDITIONS = "terms-and-conditions",
    PRIVACY_POLICY = "privacy-policy",
    REFUND_POLICY = "refund-policy",
}

export interface IPolicy {
    _id?: string;
    type: PolicyTypeEnum | string;
    title: string;
    content: string;
    publishedAt?: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface TPolicyResponse {
    statusCode?: number;
    success: boolean;
    message: string;
    data: IPolicy;
}

export interface TUpsertPolicyPayload {
    type: PolicyTypeEnum | string;
    title: string;
    content: string;
}

export const publicApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // GET /public/:type - Retrieve policy by type
        getPolicyByType: builder.query<TPolicyResponse, PolicyTypeEnum | string>({
            query: (type) => ({
                url: `/public/${type}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (_result, _error, type) => [{ type: "Policy", id: type }],
        }),

        // POST /public - Upsert policy (Super Admin)
        upsertPolicy: builder.mutation<TPolicyResponse, TUpsertPolicyPayload>({
            query: (body) => ({
                url: "/public",
                method: "POST",
                body,
                credentials: "include",
            }),
            invalidatesTags: (_result, _error, { type }) => [
                { type: "Policy", id: type },
                "Policy",
            ],
        }),
    }),
});

export const {
    useGetPolicyByTypeQuery,
    useUpsertPolicyMutation,
} = publicApi;

