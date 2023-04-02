import request from '~/utils/request';

export const getAllField = async () => {
    try {
        const res = await request.get('fields');
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data);
    }
};
