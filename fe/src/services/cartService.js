import request from '~/utils/request';

const controller = 'cart';

export const getAllMedicinesInCart = async () => {
    try {
        const load = await request.get(`/${controller}/get/2`);
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const deleteAMedicineInCart = async (id) => {
    try {
        const load = await request.delete(`/${controller}/delete/${id}`);
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const updateMedicineQuantityInCart = async (id, quantity, level) => {
    try {
        const load = await request.put(`/${controller}/update_quantity?id=${id}&quantity=${quantity}&level=${level}`);
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const updateUnitMedicineInCart = async (cartId, unitId) => {
    try {
        const load = await request.put(`/${controller}/update_unit?cartId=${cartId}&unitId=${unitId}`);
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};
