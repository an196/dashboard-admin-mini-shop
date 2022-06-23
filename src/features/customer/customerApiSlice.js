import { apiSlice } from '../../app/api/apiSlice';

export const customerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => '/customers',
        }),
    }),
});

export const { useGetCustomersQuery } = customerApiSlice;
