import { apiSlice } from "../../app/api/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/employees',
        }),
    })
})

export const {
    useGetEmployeesQuery
} = employeeApiSlice