import request from '~/utils/request';

const controller = 'order';

export const addNewOrder = async (token, account, newOrder, listOrderDetail) => {
    console.log(token);
    console.log(account);
    try {
        const load = await request.post(
            `/${controller}/add`,
            {
                order: newOrder,
                list: listOrderDetail,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    AccountType: account,
                },
            },
        );
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const getOrderByUserId = async (accessToken, accountType, email) => {
    try {
        const load = await request.get(`/${controller}/get/${email}`, {
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

export const getRewardPointById = async (accessToken, accountType, email) => {
    try {
        const load = await request.get(`/${controller}/getRewardPoint/${email}`, {
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
