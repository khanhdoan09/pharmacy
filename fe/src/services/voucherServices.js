import request from '~/utils/request';

const controller = 'voucher';

export const getAllVouchersByToDay = async (toDay) => {
    try {
        const load = await request.get(
            `/${controller}/findVouchersFromDateToDate?beginningDate=${toDay}&expirationDate=${toDay}`,
        );
        return load;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
};
