import request from '~/utils/request';

export const findRateByMedicineId = async (medicineId) => {
    try {
        const res = await request.get(`findRateByMedicineId/${medicineId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response);
    }
};
export const saveRate = async (medicineId, userEmail, star, content) => {
    try {
        const res = await request.post(`saveRate`, {
            medicineId,
            userEmail,
            star,
            content,
        });
        return res?.data;
    } catch (error) {
        console.log(error?.response);
    }
};
