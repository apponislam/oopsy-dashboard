import { baseApi } from "../../api/baseApi";

export interface IFaq {
    _id: string;
    question: string;
    answer: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface TFaqQueryParams {
    searchTerm?: string;
    page?: number;
    limit?: number;
}

export interface TFaqResponse {
    statusCode?: number;
    success: boolean;
    message: string;
    data: IFaq[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface TSingleFaqResponse {
    statusCode?: number;
    success: boolean;
    message: string;
    data: IFaq;
}

export const faqApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["Faq"] })
    .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // GET /faqs - Retrieve all FAQs
        getFaqs: builder.query<TFaqResponse, TFaqQueryParams | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
                if (params?.page) queryParams.append("page", String(params.page));
                if (params?.limit) queryParams.append("limit", String(params.limit));

                const queryString = queryParams.toString();
                return {
                    url: queryString ? `/faqs?${queryString}` : "/faqs",
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["Faq"],
        }),

        // POST /faqs - Create FAQ (Super Admin)
        createFaq: builder.mutation<TSingleFaqResponse, { question: string; answer: string }>({
            query: (body) => ({
                url: "/faqs",
                method: "POST",
                body,
                credentials: "include",
            }),
            invalidatesTags: ["Faq"],
        }),

        // PATCH /faqs/:id - Update FAQ (Super Admin)
        updateFaq: builder.mutation<
            TSingleFaqResponse,
            { id: string; data: { question?: string; answer?: string } }
        >({
            query: ({ id, data }) => ({
                url: `/faqs/${id}`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Faq"],
        }),

        // DELETE /faqs/:id - Delete FAQ (Super Admin)
        deleteFaq: builder.mutation<{ statusCode?: number; success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/faqs/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Faq"],
        }),
    }),
});

export const {
    useGetFaqsQuery,
    useCreateFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation,
} = faqApi;

