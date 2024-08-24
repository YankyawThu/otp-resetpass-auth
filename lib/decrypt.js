import CryptoJS from 'crypto-js';

export default function Decrypt(userId, token) {
    const key = CryptoJS.enc.Utf8.parse('8739216015203896');
    const iv = CryptoJS.enc.Utf8.parse(userId);
    
    const decrypted = CryptoJS.AES.decrypt(token, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const str = decrypted.toString(CryptoJS.enc.Utf8)

    return str
}