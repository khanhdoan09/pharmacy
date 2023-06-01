import { createSlice } from '@reduxjs/toolkit';

const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {
        voucher: {
            items: null,
        },
    },
    reducers: {
        addItemsToVoucher: (state, action) => {
            state.items = action.payload;
        },
    },
});
export const { addItemsToVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
