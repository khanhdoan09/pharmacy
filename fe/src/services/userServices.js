import request from '~/utils/request';

const controller = 'auth';

export const logOut = async () => {
    try {
        const load = await request.get(`/${controller}/logout`);
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};
