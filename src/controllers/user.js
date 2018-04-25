const UserActions = require('../actions/User');
const {sendSuccess, sendError} = require('../helpers/response');

exports.profile = (req, res) => {
    const {userId} = req;

    UserActions.getProfile(userId)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.myPosts = (req, res) => {
    const {userId} = req;

    const defaultArgs = {
        page: 1,
        limit: 10
    };

    const {page, limit} = Object.assign({}, defaultArgs, req.query);

    UserActions
        .getMyPosts({
            userId,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.myVotes = (req, res) => {
    const {userId} = req;

    const defaultArgs = {
        page: 1,
        limit: 10
    };

    const {page, limit} = Object.assign({}, defaultArgs, req.query);

    UserActions
        .getMyPosts({
            userId,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.myComments = (req, res) => {
    const {userId} = req;

    const defaultArgs = {
        page: 1,
        limit: 10
    };

    const {page, limit} = Object.assign({}, defaultArgs, req.query);

    UserActions
        .getMyComments({
            userId,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.myFavorites = (req, res) => {
    const {userId} = req;

    const defaultArgs = {
        page: 1,
        limit: 10
    };

    const {page, limit} = Object.assign({}, defaultArgs, req.query);

    UserActions
        .getMyFavorites({
            userId,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};