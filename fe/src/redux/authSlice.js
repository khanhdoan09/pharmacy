import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        logout: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false;
        },
    },
});
export const { loginSuccess, logoutSuccess } = authenticationSlice.actions;
export default authenticationSlice.reducer;
