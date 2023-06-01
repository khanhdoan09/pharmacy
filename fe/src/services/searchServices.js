import request from '~/utils/request';

export const search = async (keyword, page, pageSize) => {
    try {
        const res = await request.get(`search/${keyword}/${page}/${pageSize}`);
        return res?.data;
    } catch (error) {
        console.log(error); 
    }
};
