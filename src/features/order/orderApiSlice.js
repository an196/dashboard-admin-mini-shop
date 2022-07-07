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
        createOrder: builder.mutation({
            query: order => ({
                url: '/orders',
                method: 'POST',
                body: { 
                    ...order,
                    orderID: '9',
                    hireDate: order.hireDate || new Date()
                }
                 
            }),
            invalidatesTags: [ { type: 'Order', id: "LIST" }],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders`,
                method: 'DELETE',
                body: { id}
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
        updateOrder: builder.mutation({
            query: order => ({
                url: `/orders/${order._id}`,
                method: 'PUT',
                body: {
                    ...order,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
    }),
    
})

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
    useDeleteOrderMutation,
    useUpdateOrderMutation,
} = orderApiSlice