import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        categoryList: (state, action) => {
          state.categories = action.payload
        }
      }
});
export const { categoryList } = categorySlice.actions;
export default categorySlice.reducer;
