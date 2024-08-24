import CryptoJS from 'crypto-js';

export default function Encrypt(userId, text) {
    const key = CryptoJS.enc.Utf8.parse('8739216015203896');
    const iv = CryptoJS.enc.Utf8.parse(userId);
    
    // Encrypt the plain text
    const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const token = encrypted.toString()

    return token
}