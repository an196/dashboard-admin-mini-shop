import { apiSlice } from "../../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => '/categories',
            keepUnusedDataFor: 0,
            providesTags: (result, error, arg) => [
                { type: 'Category', id: "LIST" },
            ]
        }),
        createCategory: builder.mutation({
            query: category => ({
                url: '/categories',
                method: 'POST',
                body: { 
                    ...category,
                    categoryID: '9',
                    hireDate: category.hireDate || new Date()
                }
                 
            }),
            invalidatesTags: [ { type: 'Category', id: "LIST" }],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories`,
                method: 'DELETE',
                body: { id}
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
        updateCategory: builder.mutation({
            query: category => ({
                url: `/categories/${category._id}`,
                method: 'PUT',
                body: {
                    ...category,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
    }),
    
})

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} = categoryApiSlice