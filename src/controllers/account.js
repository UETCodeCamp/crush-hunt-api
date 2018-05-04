const AccountActions = require('../actions/Account');
const {sendSuccess, sendError} = require('../helpers/response');
const isEmail = require('validator/lib/isEmail');

exports.forgetPassword = (req, res) => {
    const defaultArgs = {
        email: ''
    };

    const {email} = Object.assign({}, defaultArgs, req.body);

    if (!email || !isEmail(email)) {
        return res.send({
            success: false,
            message: 'Your email address is invalid.'
        });
    }

    AccountActions.forgetPassword({email})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.resetPassword = (req, res) => {
    const defaultArgs = {
        token: '',
        password: '',
        email: ''
    };

    const {token, email, password} = Object.assign({}, defaultArgs, req.body);

    if (!token) {
        return res.send({
            success: false,
            message: 'Token must be is not empty.'
        });
    }

    if (!email || !isEmail(email)) {
        return res.send({
            success: false,
            message: 'Your email address is invalid.'
        });
    }

    if (!password || password.length < 8) {
        return res.send({
            success: false,
            message: 'Your password must be at least 8 characters in length.'
        });
    }

    AccountActions.resetPassword({token, email, password})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};