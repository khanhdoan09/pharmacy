import request from '~/utils/request';

const controller = 'order';

export const addNewOrder = async (newOrder, listOrderDetail) => {
    try {
        const load = await request.post(
            `/${controller}/add`,
            {
                order: newOrder,
                list: listOrderDetail,
            },
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //         Account: account,
            //         AddNew: 'false',
            //     },
            // },
        );
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};

export const getOrderByUserId = async (accessToken, accountType) => {
    try {
        const load = await request.get(`/${controller}/get/84`, {
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

export const getRewardPointById = async (accessToken, accountType, userId) => {
    try {
        const load = await request.get(`/${controller}/getRewardPoint/${userId}`, {
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
