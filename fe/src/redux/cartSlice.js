import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {
            medicines: null,
        },
        showCart: false,
    },
    reducers: {
        addMedicinesToCart: (state, action) => {
            state.medicines = action.payload;
        },
        removeMedicinesFromCart: (state, action) => {
            state.medicines = null;
        },
        addMedicinesToCartAndShowCartInHeader: (state, action) => {
            state.medicines = action.payload;
            state.showCart = true;
        },
        unShowCartInHeader: (state) => {
            state.showCart = false;
        },
    },
});
export const {
    addMedicinesToCart,
    removeMedicinesFromCart,
    addMedicinesToCartAndShowCartInHeader,
    unShowCartInHeader,
} = cartSlice.actions;
export default cartSlice.reducer;
