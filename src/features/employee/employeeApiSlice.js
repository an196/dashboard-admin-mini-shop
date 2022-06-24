import { apiSlice } from "../../app/api/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/employees',
        }),
        createEmployee: builder.mutation({
            query: epmloyee => ({
                url: '/employees',
                method: 'POST',
                body: {
                    ...epmloyee,
                } 
            })
        }),
    }),
    
})

export const {
    useGetEmployeesQuery,
    useCreateEmployeeMutation,
} = employeeApiSlice