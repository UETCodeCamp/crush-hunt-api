const User = require('../models/User');
const {randomToken} = require('../helpers/crypto');
const EmailServices = require('../services/EmailServices');

exports.forgetPassword = ({email}) => {
    return User.findOne({
        email
    }).then(user => {
        if (!user) {
            throw new Error('No account with that email address exists.');
        }

        return Promise.resolve(user);
    }).then(user => {
        return randomToken()
            .then(token => {
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;

                return user.save();
            });
    }).then(user => {
        EmailServices.sendMail({
            to: user.email,
            from: 'hi@crushunt.me',
            subject: 'Password Reset',
            html: 'Hello ace!',
        });

        return Promise.resolve(true);
    });
};