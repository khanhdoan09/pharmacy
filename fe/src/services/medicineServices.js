import request from '~/utils/request';

export const getAllMedicines = async () => {
    try {
        const res = await request.get('medicines');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
