import { createSlice } from '@reduxjs/toolkit';

const medicineSlice = createSlice({
    name: 'medicines',
    initialState: {},
    reducers: {
        setMedicines: (state, action) => {
            return action.payload;
        },
        setMedicineId: (state, action) => {
            state.selectedMedicineId = action.payload;
        },
    },
});
export const { setMedicines, setMedicineId } = medicineSlice.actions;
export default medicineSlice.reducer;
