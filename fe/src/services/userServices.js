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

export const loginWithAccessToken = async (accessToken, accountType) => {
    try {
        const load = await request.get(`/${controller}/loginWithAccessToken`, {
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

export const registerWithAccessToken = async (accessToken, accountType) => {
    try {
        const load = await request.get(`/${controller}/registerWithAccessToken`, {
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
