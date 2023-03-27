import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { persistReducer } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import thunk from 'redux-thunk';

const persistAuthenticationConfig = {
    key: 'auth',
    storage,
    blacklist: ['authentication'],
};

const persistedAuthenticationReducer = persistReducer(persistAuthenticationConfig, authSlice);

export default configureStore({
    reducer: {
        authentication: persistedAuthenticationReducer,
    },
    middleware: [thunk],
});
