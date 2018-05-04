const User = require('../models/User');
const {randomToken} = require('../helpers/crypto');
const EmailServices = require('../services/EmailServices');
const appConfig = require('../app.config');

const appUrl = appConfig.get('/appUrl');

exports.resetPassword = ({token, password, email}) => {

};

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
        const resetPasswordToken = user.get('resetPasswordToken');
        const email = user.email;

        EmailServices.sendMail({
            to: user.email,
            from: 'hi@crushunt.me',
            subject: '[Crush Hunt]Reset your password',
            html: `
               You can change password at: <a href="${appUrl}/reset-password/${resetPasswordToken}?email=${email}">Change password</a>.
            `,
        });

        return Promise.resolve(true);
    });
};