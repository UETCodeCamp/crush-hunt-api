const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
};

exports.comparePassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
};

exports.randomToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(20, (error, buffer) => {
            if (error) {
                return reject(error);
            }

            const token = buffer.toString('hex');

            return resolve(token);
        });
    });
};