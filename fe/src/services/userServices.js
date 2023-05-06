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
export const loginNormal = async (email, encryptedPassword) => {
    console.log(email);
    console.log(encryptedPassword);
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
                email,
                oldPassword,
                newPassword,
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
        const load = await request.get(`/${controller}/findUserByEmail/${email}`);
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
                email,
                name,
                phoneNumber: phone,
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
