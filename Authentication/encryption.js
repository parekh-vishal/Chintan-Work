const crypto = require('crypto');
const iv = crypto.randomBytes(16);
exports.encoding = (data) => {
    const key = crypto.randomBytes(32);
    let algorithm = 'aes-256-cbc';
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    console.log(Buffer.from(key));
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex'),Key: key.toString('hex')};
};

exports.decoding = (data) => {
    let algorithm = 'aes-256-cbc';
    let iv = Buffer.from(data.iv, 'hex');
    const key = Buffer.from(data.Key,'hex');
    let encryptedText = Buffer.from(data.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}