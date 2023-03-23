import * as request from '~/utils/request';

export const search = async (keyword, page, pageSize) => {
    try {
        const res = await request.get('search', {
            params: {
                keyword,
                page,
                pageSize,
            },
        });
        return res;
    } catch (error) {
        console.log('this alert will detlete when deploy (alert search 404)');
        console.log(error.response.data); // delete when deploy
    }
};
