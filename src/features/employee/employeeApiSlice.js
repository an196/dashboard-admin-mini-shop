import { apiSlice } from "../../app/api/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/employees',
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => [
                { type: 'Employee', id: "LIST" },
                
            ]
        }),
        createEmployee: builder.mutation({
            query: employee => ({
                url: '/employees',
                method: 'POST',
                body: { 
                    ...employee,
                    employeeID: '9',
                    hireDate: employee.hireDate || new Date()
                }
                 
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
        updateEmployee: builder.mutation({
            query: employee => ({
                url: `/employees/${employee._id}`,
                method: 'PUT',
                body: {
                    ...employee,
                }
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
    useUpdateEmployeeMutation,
} = employeeApiSlice