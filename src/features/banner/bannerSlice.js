import { createSlice } from '@reduxjs/toolkit';

const bannerSlice = createSlice({
    name: 'banner',
    initialState: { saleTime: null},
    reducers: {
        setSaleTime: (state, action) => {
            state.saleTime = action.payload;
        },
    },
});

export const { setSaleTime } = bannerSlice.actions;

export default bannerSlice.reducer;
export const selectCurrentSaleTime = (state) => state.saleTime;
