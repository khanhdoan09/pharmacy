import { encrypt } from '~/utils/cryptoUtils';
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
export const postComment = async (userEmail, medicineId, content) => {
    try {
        const res = await request.post(`postComment`, {
            email: encrypt(userEmail),
            medicineId,
            content: encrypt(content),
        });
        return res?.data;
    } catch (error) {
        console.log(error?.response);
    }
};

export const responseComment = async (userEmail, commentId, medicineId, content) => {
    try {
        const res = await request.post(`responseComment`, {
            email: encrypt(userEmail),
            commentId: encrypt(commentId),
            medicineId: encrypt(medicineId),
            content: encrypt(content),
        });
        return res?.data;
    } catch (error) {
        console.log(error?.response);
    }
};

export const findLikeByCommentIdAndUserId = async (commentId, userEmail) => {
    try {
        const res = await request.get(`findLikeByCommentIdAndUserId/${commentId}/${encrypt(userEmail)}`);
        return res?.data;
    } catch (error) {
        // console.log(error?.response?.data);
    }
};

export const likeComment = async (commentId, userEmail) => {
    try {
        const res = await request.post(`addLike`, {
            commentId,
            email: encrypt(userEmail),
        });
        return res?.data;
    } catch (error) {
        // console.log(error?.response?.data);
    }
};
export const unLikeComment = async (commentId, userEmail) => {
    try {
        const res = await request.delete(`unLikeComment/${commentId}/${encrypt(userEmail)}`);
        return res?.data;
    } catch (error) {
        // console.log(error?.response?.data);
    }
};
