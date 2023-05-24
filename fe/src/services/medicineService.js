import request from '~/utils/request';
import { encrypt } from '~/utils/cryptoUtils';

export const getMedicines = async () => {
    try {
        const res = await request.get(`getMedicines`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data);
    }
};

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

export const findBySlugFieldAndSlugCategory = async (slugField, slugCategory) => {
    try {
        const res = await request.get(`findBySlugFieldAndSlugCategory/${slugField}/${slugCategory}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const savedMedicine = async (accessToken, accountType, email, medicineId) => {
    try {
        const res = await request.post(
            `savedMedicine`,
            {
                email,
                medicineId,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    AccountType: accountType,
                },
            },
        );
        return res?.data;
    } catch (error) {
        console.log(error);
        console.log(error?.response?.data); // delete when deploy
    }
};
export const unsavedMedicine = async (accessToken, accountType, email, medicineId) => {
    try {
        const res = await request.post(
            `unsavedMedicine`,
            {
                email,
                medicineId,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    AccountType: accountType,
                },
            },
        );
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const findSavedByEmail = async (email) => {
    try {
        const res = await request.get(`findSavedByEmail/${email}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
export const findSavedByEmailAndMedicineId = async (email, medicineId) => {
    try {
        const res = await request.get(`findSavedByEmailAndMedicineId/${email}/${medicineId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
