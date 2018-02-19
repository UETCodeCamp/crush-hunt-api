const CommentActions = require('../actions/Comment');
const VoteCommentActions = require('../actions/VoteComment');
const {sendSuccess, catchError} = require('../helpers/response');

exports.addComment = (req, res) => {
    const {userId} = req;
    const postId = req.params['id'];

    const defaultArgs = {
        content: ''
    };
    const {content} = Object.assign({}, defaultArgs, req.body);

    CommentActions.addComment({userId, postId, content})
        .then(sendSuccess)
        .catch(catchError);
};

exports.deleteComment = (req, res) => {
    const {userId} = req;
    const postId = req.params['id'];
    const {commentId} = req.params;


    CommentActions.deleteComment({userId, postId, commentId})
        .then(sendSuccess)
        .catch(catchError);
};

exports.updateComment = (req, res) => {
    res.send('@todo');
};

exports.listFreshComments = (req, res) => {
    const postId = req.params['id'];

    CommentActions.listFreshComments({postId})
        .then(sendSuccess)
        .catch(catchError);
};

exports.listHotComments = (req, res) => {
    const postId = req.params['id'];

    CommentActions.listHostComments({postId})
        .then(sendSuccess)
        .catch(catchError);
};

exports.voteComment = (req, res) => {
    const {userId} = req;
    const postId = req.params['id'];
    const {commentId} = req.params;

    VoteCommentActions.vote({userId, commentId, postId})
        .then(sendSuccess)
        .catch(catchError);
};

exports.unVoteComment = (req, res) => {
    const {userId} = req;
    const postId = req.params['id'];
    const {commentId} = req.params;

    VoteCommentActions.unVote({userId, commentId, postId})
        .then(sendSuccess)
        .catch(catchError);
};