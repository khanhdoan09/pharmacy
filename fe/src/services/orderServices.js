import request from '~/utils/request';

const controller = 'order';

export const addNewOrder = async (newOrder, listOrderDetail) => {
    try {
        let payload = {
            order: newOrder,
            list: listOrderDetail,
        };

        const load = await request.post(
            `/${controller}/add`,
            {
                payload,
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
