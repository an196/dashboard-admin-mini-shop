import { apiSlice } from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => '/orders',
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => [
                { type: 'Order', id: "LIST" },
            ]
        }),

    }),
    
})

export const {
    useGetOrdersQuery,
} = orderApiSlice