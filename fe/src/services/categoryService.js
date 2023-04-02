import request from '~/utils/request';

export const getCategoriesByFieldId = async (fieldId) => {
    try {
        const res = await request.get(`categories/${fieldId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response);
    }
};

export const getCategoriesByFieldSlug = async (slugField) => {
    try {
        const res = await request.get(`findCategoriesBySlugField/${slugField}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response);
    }
};
