import request from '~/utils/request';
import { encrypt } from '~/utils/cryptoUtils';

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
export const loginNormal = async (email, encryptedPassword) => {
    try {
        const load = await request.post(`/${controller}/loginNormal`, {
            email: email,
            password: encryptedPassword,
        });
        return load.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};
export const changePassword = async (accessToken, accountType, email, oldPassword, newPassword) => {
    try {
        const load = await request.put(
            `/${controller}/changePassword`,
            {
                email: encrypt(email),
                oldPassword: encrypt(oldPassword),
                newPassword: encrypt(newPassword),
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    AccountType: accountType,
                },
            },
        );
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const findUserByEmail = async (email) => {
    try {
        const load = await request.get(`/${controller}/findUserByEmail/${encrypt(email)}`);
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};
export const updateInformation = async (accessToken, accountType, email, name, phone) => {
    try {
        const load = await request.put(
            `/${controller}/updateInformation`,
            {
                email: encrypt(email),
                name: encrypt(name),
                phoneNumber: encrypt(phone),
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    AccountType: accountType,
                },
            },
        );
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const registerByForm = async (username, email, encryptedPassword) => {
    try {
        const load = await request.post(`/${controller}/registerWithForm`, {
            name: username,
            email: email,
            password: encryptedPassword,
        });
        return load.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const activeCode = async (email, code) => {
    try {
        const load = await request.post(`/${controller}/active-account`, {
            email: email,
            activeCodeValue: code,
        });
        return load.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const sendActiveCodeAgain = async (email) => {
    alert(email);
    try {
        const load = await request.post(`/${controller}/sendActiveCodeAgain`, {
            email,
        });
        return load.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};
