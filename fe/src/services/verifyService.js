import request from '~/utils/request';
import { encrypt } from '~/utils/cryptoUtils';
export const generateCode = async (email) => {
    try {
        const res = await request.post(`auth/generateCode`, {
            email: encrypt(email),
        });
        return res?.data;
    } catch (error) {
        return error?.data;
    }
};
export const verificationCode = async (code, email) => {
    try {
        const res = await request.post(`auth/verificationCode`, {
            code: encrypt(code),
            email: encrypt(email),
        });
        return res?.data;
    } catch (error) {
        return error?.data;
    }
};
export const resetPassword = async (newPassword, email) => {
    try {
        const res = await request.post(`auth/resetPassword`, {
            newPassword: newPassword,
            email: encrypt(email),
        });
        return res?.data;
    } catch (error) {
        return error?.data;
    }
};
