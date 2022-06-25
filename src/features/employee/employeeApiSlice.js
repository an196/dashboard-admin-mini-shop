import { apiSlice } from "../../app/api/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/employees',
            keepUnusedDataFor: 1,
            providesTags: (result, error, arg) => [
                { type: 'Employee', id: "LIST" },
                
            ]
        }),
        createEmployee: builder.mutation({
            query: epmloyee => ({
                url: '/employees',
                method: 'POST',
                epmloyee,
                 
            }),
            invalidatesTags: [ { type: 'Employee', id: "LIST" }],
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employees`,
                method: 'DELETE',
                body: { id}
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Employee', id: arg.id }
            ]
        }),
    }),
    
})

export const {
    useGetEmployeesQuery,
    useCreateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApiSlice