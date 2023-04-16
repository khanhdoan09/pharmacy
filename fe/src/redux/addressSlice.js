import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        address: {
            detail: null,
        },
    },
    reducers: {
        addAddress: (state, action) => {
            state.detail = action.payload;
        },
        removeAddress: (state, action) => {
            state.detail = null;
        },
    },
});
export const { addAddress, removeAddress } = addressSlice.actions;
export default addressSlice.reducer;
