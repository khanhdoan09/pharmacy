import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { persistReducer } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import thunk from 'redux-thunk';
import cartSlice from './cartSlice';
import addressSlice from './addressSlice';

const persistAuthenticationConfig = {
    key: 'auth',
    storage,
    blacklist: ['authentication'],
};

const persistCartConfig = {
    key: 'cart',
    storage,
    blacklist: ['cart'],
};

const persistAddressConfig = {
    key: 'address',
    storage,
    blacklist: ['address'],
};

const persistedAuthenticationReducer = persistReducer(persistAuthenticationConfig, authSlice);
const persistedCartReducer = persistReducer(persistCartConfig, cartSlice);
const persistedAddressReducer = persistReducer(persistAddressConfig, addressSlice);

export default configureStore({
    reducer: {
        authentication: persistedAuthenticationReducer,
        cart: persistedCartReducer,
        address: persistedAddressReducer,
    },
    middleware: [thunk],
});
