import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {
            medicines: null,
        },
    },
    reducers: {
        addMedicinesToCart: (state, action) => {
            state.medicines = action.payload;
        },
        removeMedicinesFromCart: (state, action) => {
            state.medicines = null;
        },
    },
});
export const { addMedicinesToCart, removeMedicinesFromCart } = cartSlice.actions;
export default cartSlice.reducer;
