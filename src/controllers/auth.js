const AuthActions = require('../actions/Auth');
const isEmail = require('validator/lib/isEmail');
const {sendError, sendSuccess} = require("../helpers/response");

exports.isAuthorized = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization'];

    AuthActions.isAuthorized(token)
        .then(result => {
            const {id} = result;
            req['userId'] = id;

            return next();
        })
        .catch(error => {
            return res.status(403).send({
                success: false,
                message: error.message || ''
            });
        });
};

exports.register = (req, res) => {
    const defaultArgs = {
        email: '',
        password: '',
        name: ''
    };

    const {email, name, password} = Object.assign({}, defaultArgs, req.body);

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

    AuthActions.register({email, password, name})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.login = (req, res) => {
    const defaultArgs = {
        email: '',
        password: '',
    };

    const {email, password} = Object.assign({}, defaultArgs, req.body);
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

    AuthActions.login({email, password})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};
