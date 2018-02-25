const PostActions = require('../actions/Post');
const VotePostActions = require('../actions/VotePost');
const {sendSuccess, catchError} = require('../helpers/response');
const UploadServices = require('../services/UploadServices');

exports.upload = (req, res) => {
    const {file} = req;
    const {path} = file;

    return UploadServices.upload({pathFile: path, unLink: true})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.create = (req, res) => {
    const userId = req['userId'];

    const defaultArgs = {
        title: '',
        url: ''
    };

    const {title, url} = Object.assign({}, defaultArgs, req.body);
    PostActions.create({userId, title, url})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.detail = (req, res) => {
    const userId = req['userId'];
    const postId = req.params['id'];

    PostActions.detail({postId, userId})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.update = (req, res) => {
    const userId = req['userId'];
    const postId = req.params['id'];

    const defaultArgs = {
        title: '',
        url: ''
    };

    const {title, url} = Object.assign({}, defaultArgs, req.body);

    PostActions.update({userId, postId, title, url})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.delete = (req, res) => {
    const userId = req['userId'];
    const postId = req.params['id'];

    PostActions.delete({userId, postId})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.vote = (req, res) => {
    const userId = req['userId'];
    const postId = req.params['id'];

    VotePostActions.vote({userId, postId})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));

};

exports.unVote = (req, res) => {
    const userId = req['userId'];
    const postId = req.params['id'];

    VotePostActions.unVote({userId, postId})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.listPendingPosts = (req, res) => {
    const defaultArgs = {
        page: 1,
        limit: 10
    };

    const {page, limit} = Object.assign({}, defaultArgs, req.query);
    PostActions
        .listPendingPosts({
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        })
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};