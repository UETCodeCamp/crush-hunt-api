const PostActions = require('../actions/Post');
const VotePostActions = require('../actions/VotePost');
const {sendSuccess, catchError} = require('../helpers/response');
const UploadServices = require('../services/UploadServices');

exports.upload = (req, res) => {
    const {image} = req.file;
    const {path} = image;

    return UploadServices.upload({pathFile: path})
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
    res.send('@todo');
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
