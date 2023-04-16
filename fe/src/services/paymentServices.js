import request from '~/utils/request';

export const getCurrentExchangeRate = async (token, account) => {
    try {
        const load = await request.get('https://api.exchangerate.host/latest?base=USD', {});
        const value = load?.data?.rates?.VND;
        return value;
    } catch (error) {
        return 23000;
    }
};
