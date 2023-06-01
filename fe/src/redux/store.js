import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistReducer } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import addressSlice from './addressSlice';
import authSlice from './authSlice';
import cartSlice from './cartSlice';
import categorySlice from './categorySlice';
import fieldSlice from './fieldSlice';
import medicineSlice from './medicineSlice';
import voucherSlice from './voucherSlice';

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
const persistFieldConfig = {
    key: 'field',
    storage,
    blacklist: ['field'],
};
const persistCategoryConfig = {
    key: 'category',
    storage,
    blacklist: ['category'],
};

const persistMedicineConfig = {
    key: 'medicine',
    storage,
    blacklist: ['medicine'],
};

const persistVoucherConfig = {
    key: 'voucher',
    storage,
    blacklist: ['voucher'],
};

const persistedAuthenticationReducer = persistReducer(persistAuthenticationConfig, authSlice);
const persistedCartReducer = persistReducer(persistCartConfig, cartSlice);
const persistedAddressReducer = persistReducer(persistAddressConfig, addressSlice);
const persistedFieldReducer = persistReducer(persistFieldConfig, fieldSlice);
const persistedCategoryReducer = persistReducer(persistCategoryConfig, categorySlice);
const persistedMedicineReducer = persistReducer(persistMedicineConfig, medicineSlice);
const persistedVoucherReducer = persistReducer(persistVoucherConfig, voucherSlice);

export default configureStore({
    reducer: {
        authentication: persistedAuthenticationReducer,
        cart: persistedCartReducer,
        address: persistedAddressReducer,
        fields: persistedFieldReducer,
        categories: persistedCategoryReducer,
        medicine: persistedMedicineReducer,
        voucher: persistedVoucherReducer,
    },
    middleware: [thunk],
});
