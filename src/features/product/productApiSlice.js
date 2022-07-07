import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/products',
            keepUnusedDataFor: 0,
            providesTags: (result, error, arg) => [
                { type: 'Product', id: "LIST" },
            ]
        }),
        createProduct: builder.mutation({
            query: product => ({
                url: '/products',
                method: 'POST',
                body: { 
                    ...product,
                    productID: '9',
                    hireDate: product.hireDate || new Date()
                }
                 
            }),
            invalidatesTags: [ { type: 'product', id: "LIST" }],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products`,
                method: 'DELETE',
                body: { id}
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        updateProduct: builder.mutation({
            query: product => ({
                url: `/products/${product._id}`,
                method: 'PUT',
                body: {
                    ...product,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
    }),
    
})

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = productApiSlice