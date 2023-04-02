import request from '~/utils/request';

export const getCategoryDetailByCategoryId = async (categoryId) => {
    try {
        const res = await request.get(`categoryDetail/${categoryId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data);
    }
};
export const findCategoryDetailBySlugCategory = async (slugCategory) => {
    try {
        const res = await request.get(`findCategoryDetailBySlugCategory/${slugCategory}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data);
    }
};
