import request from '~/utils/request';

const controller = 'unit';

export const getAllUnitsInAMedicine = async (medicineId) => {
    try {
        const load = await request.get(`/${controller}/get/${medicineId}`);
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};
