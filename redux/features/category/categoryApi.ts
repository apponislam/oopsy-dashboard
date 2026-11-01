import { baseApi } from "../../api/baseApi";

export interface ICategory {
    _id: string;
    name: string;
    slug?: string;
    image?: string;
    isActive: boolean;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface TCategoryQueryParams {
    searchTerm?: string;
    isActive?: boolean | string;
    page?: number;
    limit?: number;
}

export interface TCategoryResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: ICategory[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface TSingleCategoryResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: ICategory;
}

export const categoryApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // GET /categories/admin - List categories with pagination and filters
        getCategories: builder.query<TCategoryResponse, TCategoryQueryParams | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
                if (params?.isActive !== undefined && params?.isActive !== "") {
                    queryParams.append("isActive", String(params.isActive));
                }
                if (params?.page) queryParams.append("page", String(params.page));
                if (params?.limit) queryParams.append("limit", String(params.limit));

                const queryString = queryParams.toString();
                return {
                    url: queryString ? `/categories/admin?${queryString}` : "/categories/admin",
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["Category"],
        }),

        // GET /categories/:id - Get single category
        getSingleCategory: builder.query<TSingleCategoryResponse, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (_result, _error, id) => [{ type: "Category", id }],
        }),

        // POST /categories - Create category (with image upload)
        createCategory: builder.mutation<TSingleCategoryResponse, FormData>({
            query: (body) => ({
                url: "/categories",
                method: "POST",
                body,
                credentials: "include",
            }),
            invalidatesTags: ["Category"],
        }),

        // PATCH /categories/:id - Update category
        updateCategory: builder.mutation<
            TSingleCategoryResponse,
            { id: string; data: FormData | Partial<ICategory> }
        >({
            query: ({ id, data }) => ({
                url: `/categories/${id}`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Category"],
        }),

        // PATCH /categories/:id/status - Toggle active status
        toggleCategoryStatus: builder.mutation<TSingleCategoryResponse, string>({
            query: (id) => ({
                url: `/categories/${id}/status`,
                method: "PATCH",
                credentials: "include",
            }),
            invalidatesTags: ["Category"],
        }),

        // DELETE /categories/:id - Soft delete category
        deleteCategory: builder.mutation<
            { statusCode: number; success: boolean; message: string },
            string
        >({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetSingleCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useToggleCategoryStatusMutation,
    useDeleteCategoryMutation,
} = categoryApi;
