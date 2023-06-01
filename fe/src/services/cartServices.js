import request from '~/utils/request';

const controller = 'cart';

export const getAllMedicinesInCart = async (token, account, email) => {
    try {
        const load = await request.get(`/${controller}/get/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                AccountType: account,
            },
        });
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const deleteAMedicineInCart = async (id, token, account) => {
    try {
        const load = await request.delete(`/${controller}/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                AccountType: account,
            },
        });
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const updateMedicineQuantityInCart = async (id, quantity, level, token, account) => {
    try {
        const load = await request.put(
            `/${controller}/update_quantity?id=${id}&quantity=${quantity}&level=${level}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    AccountType: account,
                },
            },
        );
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const updateUnitMedicineInCart = async (cartId, unitId, token, account) => {
    try {
        const load = await request.put(
            `/${controller}/update_unit?cartId=${cartId}&unitId=${unitId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    AccountType: account,
                },
            },
        );
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const addNewMedicineInCart = async (medicineId, unitId, quantity, email, accessToken, accountType) => {
    try {
        const payload = {
            userEmail: email,
            medicineId: medicineId,
            unitId: unitId,
            quantity: quantity,
        };
        const load = await request.post(`/${controller}/add`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                AccountType: accountType,
            },
        });
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};
