import { apiSlice } from "../../app/api/apiSlice";

export const bannerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBanner: builder.query({
            query: () => '/banners/default',
            keepUnusedDataFor: 0,
            providesTags: (result, error, arg) => [
                { type: 'Banner', id: "LIST" },
            ]
        }),
        createBanner: builder.mutation({
            query: banner => ({
                url: '/banner/default',
                method: 'POST',
                body: { 
                    ...banner,
                }
                 
            }),
            invalidatesTags: [ { type: 'Banner', id: "LIST" }],
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/banners/default`,
                method: 'DELETE',
                body: { id}
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Banner', id: arg.id }
            ]
        }),
        updateBanner: builder.mutation({
            query: banner => ({
                url: `/banners/default/${banner._id}`,
                method: 'PATCH',
                body: {
                    ...banner,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Banner', id: arg.id }
            ]
        }),
    }),
    
})

export const {
    useGetBannerQuery,
    useCreateBannerMutation,
    useDeleteBannerMutation,
    useUpdateBannerMutation,
} = bannerApiSlice