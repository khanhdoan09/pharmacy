import { createSlice } from '@reduxjs/toolkit';

const medicineSlice = createSlice({
    name: 'medicines',
    initialState: {},
    reducers: {
        setMedicines: (state, action) => {
            return action.payload;
        },
    },
});
export const { setMedicines } = medicineSlice.actions;
export default medicineSlice.reducer;
