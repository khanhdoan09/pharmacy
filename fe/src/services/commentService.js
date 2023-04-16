import request from '~/utils/request';

export const findAllComments = async () => {
    try {
        const res = await request.get(`findAllComments`);
        return res?.data;
    } catch (error) {
        console.log(error?.response);
    }
};

export const findCommentsByMedicineIdOrderByCreateDate = async (medicineId) => {
    try {
        const res = await request.get(`findCommentsByMedicineIdOrderByCreateDate/${medicineId}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response);
    }
};
export const postComment = async (userId, medicineId, content) => {
    try {
        const res = await request.post(`postComment/${userId}/${medicineId}/${content}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response);
    }
};

export const responseComment = async (userId, commentId, medicineId, content) => {
    try {
        const res = await request.post(`responseComment/${userId}/${commentId}/${medicineId}/${content}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response);
    }
};

export const findLikeByCommentIdAndUserId = async (commentId, userId) => {
    try {
        const res = await request.get(`findLikeByCommentIdAndUserId/${commentId}/${userId}`);
        return res?.data;
    } catch (error) {
        // console.log(error?.response?.data);
    }
};

export const likeComment = async (commentId, userId) => {
    try {
        const res = await request.post(`addLike/${commentId}/${userId}`);
        return res?.data;
    } catch (error) {
        // console.log(error?.response?.data);
    }
};
export const unLikeComment = async (commentId, userId) => {
    try {
        const res = await request.delete(`unLikeComment/${commentId}/${userId}`);
        return res?.data;
    } catch (error) {
        // console.log(error?.response?.data);
    }
};
