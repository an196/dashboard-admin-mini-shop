import { apiSlice } from '../../app/api/apiSlice';

export const customerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => '/customers',
        }),
        deleteCustomers: builder.mutation({
            query: (id) => ({
                url: `/customers/${id}`,
                method: 'DELETE',
                body: {}
            })
        }),
    }),
});

export const { useGetCustomersQuery, useDeleteCustomersMutation } = customerApiSlice;
