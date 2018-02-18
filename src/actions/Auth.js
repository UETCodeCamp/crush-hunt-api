const JWT = require('jsonwebtoken');
const appConfig = require('../app.config');
const User = require('../models/User');
const cryptoHelpers = require('../helpers/crypto');

exports.isAuthorized = (token) => {
    if (token) {
        const secretKey = appConfig.get('/secretKey');

        return new Promise((resolve, reject) => {
            JWT.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return reject(new Error('Failed to authenticate token.'));
                } else {
                    return resolve(decoded);
                }
            });
        });
    } else {
        return Promise.reject(new Error('No token provided.'));
    }
};

exports.register = ({email, password, name = ''}) => {
    return User.findOne({
        email
    }).then(user => {
        if (user) {
            throw new Error('User exists.');
        }

        return cryptoHelpers.hashPassword(password)
            .then(hashPassword => {
                const u = new User({
                    email,
                    name,
                    password: hashPassword
                });

                return u.save();
            });
    });
};

exports.login = ({email, password}) => {
    return User.findOne({
        email
    }).then(user => {
        if (!user) {
            throw new Error('User not found!');
        }

        const hashPassword = user.get('password');

        return cryptoHelpers.comparePassword(password, hashPassword)
            .then(result => {
                if (!result) {
                    throw new Error('Your password is incorrect.');
                }

                return Promise.resolve(result);
            })
            .then(result => {
                const secretKey = appConfig.get('/jwt/key');
                const expires = appConfig.get('/jwt/expires');
                const userId = user.get('_id');

                //Generate json web token
                const accessToken = JWT.sign({id: userId}, secretKey, {
                    expiresIn: expires
                });

                return Promise.resolve({accessToken, user});
            });
    });
};