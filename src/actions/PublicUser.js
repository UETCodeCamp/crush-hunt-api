const User = require('../models/User');
const {md5} = require("../helpers/crypto");

exports.getAvatar = (userId) => {
    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new Error('User not found!');
            }

            return Promise.resolve(user);
        })
        .then(user => {
            const email = user.get('email');
            const md5Email = md5(email);

            return Promise.resolve(`https://www.gravatar.com/avatar/${md5Email}.jpg`);
        })
        .catch(error => {
            return Promise.resolve('https://www.gravatar.com/avatar');
        });
};