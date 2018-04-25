const HomeActions = require('../actions/Home');
const {sendSuccess, sendError} = require('../helpers/response');

exports.hot = (req, res) => {
    const defaultArgs = {
        page: 1,
        limit: 10
    };

    const {page, limit} = Object.assign({}, defaultArgs, req.query);

    HomeActions
        .hot({
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.trending = (req, res) => {
    const defaultArgs = {
        page: 1,
        limit: 10
    };

    const {page, limit} = Object.assign({}, defaultArgs, req.query);

    HomeActions
        .trending({
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.fresh = (req, res) => {
    const defaultArgs = {
        page: 1,
        limit: 10
    };

    const {page, limit} = Object.assign({}, defaultArgs, req.query);

    HomeActions
        .fresh({
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};