import request from '~/utils/request';

export const bestSellerByFieldId = async (fieldId) => {
    try {
        const res = await request.get(`bestSellerByFieldId/${fieldId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data);
    }
};

export const bestSellerByCategoryId = async (categoryId) => {
    try {
        const res = await request.get(`bestSellerByCategoryId/${categoryId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data);
    }
};

export const findMedicineByFieldIdOrderByExpensivePrice = async (fieldId) => {
    try {
        const res = await request.get(`findMedicineByFieldIdOrderByExpensivePrice/${fieldId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const findMedicineByFieldIdOrderByCheapPrice = async (fieldId) => {
    try {
        const res = await request.get(`findMedicineByFieldIdOrderByCheapPrice/${fieldId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const findMedicineByFieldIdOrderByNewRelease = async (fieldId) => {
    try {
        const res = await request.get(`findMedicineByFieldIdOrderByNewRelease/${fieldId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const findMedicineByCategoryIdOrderByExpensivePrice = async (categoryId) => {
    try {
        const res = await request.get(`findMedicineByCategoryIdOrderByExpensivePrice/${categoryId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
export const findMedicineByCategoryIdOrderByCheapPrice = async (categoryId) => {
    try {
        const res = await request.get(`findMedicineByCategoryIdOrderByCheapPrice/${categoryId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
export const findMedicineByCategoryIdOrderByNewRelease = async (categoryId) => {
    try {
        const res = await request.get(`findMedicineByCategoryIdOrderByNewRelease/${categoryId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
export const findMedicineByCategoryDetailId = async (categoryDetailId) => {
    try {
        const res = await request.get(`findMedicineByCategoryDetailId/${categoryDetailId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const findMedicineDetailByMedicineId = async (medicineId) => {
    try {
        const res = await request.get(`findMedicineDetailByMedicineId/${medicineId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
export const findMedicineIngredientByMedicineId = async (medicineId) => {
    try {
        const res = await request.get(`findMedicineIngredientByMedicineId/${medicineId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const findBestMedicinesInHistory = async () => {
    try {
        const res = await request.get(`findBestMedicinesInHistory`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data);
    }
};

export const findMedicinesByObject = async (object) => {
    try {
        const res = await request.get(`findMedicinesByObject/${object}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data);
    }
};

export const findMedicinesRelated = async (categoryDetailId) => {
    try {
        const res = await request.get(`findMedicinesByCategoryDetailId/${categoryDetailId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data);
    }
};
