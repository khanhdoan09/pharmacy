import CryptoJS from 'crypto-js';
export const encrypt = (text) => {
    const key = CryptoJS.enc.Latin1.parse('1234567812345678');
    const iv = CryptoJS.enc.Latin1.parse('1234567812345678');
    var encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
    });
    return encrypted.toString();
};