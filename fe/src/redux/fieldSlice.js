import { createSlice } from '@reduxjs/toolkit';

const fieldSlice = createSlice({
    name: 'fields',
    initialState: {},
    reducers: {
        fieldList: (state, action) => {
          state.fields = action.payload
        }
      }
});
export const { fieldList } = fieldSlice.actions;
export default fieldSlice.reducer;
