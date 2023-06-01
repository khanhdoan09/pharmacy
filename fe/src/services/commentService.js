import { encrypt } from '~/utils/cryptoUtils';
import request from '~/utils/request';

export const findAllComments = async () => {
    try {
        const res = await request.get(`findAllComments`);
        return res?.data;
    } catch (error) {}
};

export const findCommentsByMedicineId = async (medicineId) => {
    try {
        const res = await request.get(`findCommentsByMedicineId/${medicineId}`);
        return res?.data;
    } catch (error) {}
};
export const postComment = async (accessToken, accountType, userEmail, medicineId, content) => {
    try {
        const res = await request.post(
            `postComment`,
            {
                email: encrypt(userEmail),
                medicineId,
                content: encrypt(content),
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    AccountType: accountType,
                },
            },
        );
        return res?.data;
    } catch (error) {}
};

export const responseComment = async (accessToken, accountType, userEmail, commentId, medicineId, content) => {
    try {
        const res = await request.post(
            `responseComment`,
            {
                email: encrypt(userEmail),
                commentId: encrypt(commentId),
                medicineId: encrypt(medicineId),
                content: encrypt(content),
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    AccountType: accountType,
                },
            },
        );
        return res?.data;
    } catch (error) {}
};

export const findLikeByCommentIdAndUserId = async (commentId, userEmail) => {
    try {
        const res = await request.get(`findLikeByCommentIdAndUserId/${commentId}/${userEmail}`);
        return res?.data;
    } catch (error) {}
};

export const likeComment = async (accessToken, accountType, commentId, userEmail) => {
    try {
        const res = await request.post(
            `addLike`,
            {
                commentId,
                email: encrypt(userEmail),
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    AccountType: accountType,
                },
            },
        );
        return res?.data;
    } catch (error) {}
};
export const unLikeComment = async (accessToken, accountType, commentId, userEmail) => {
    try {
        const res = await request.delete(`unLikeComment/${commentId}/${userEmail}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                AccountType: accountType,
            },
        });
        return res?.data;
    } catch (error) {}
};
