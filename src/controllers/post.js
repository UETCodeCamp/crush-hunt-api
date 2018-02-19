const PostActiosn = require('../actions/Post');
const VotePostActions = require('../actions/VotePost');
const {sendSuccess, catchError} = require('../helpers/response');

exports.create = (req, res) => {

};

exports.detail = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

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
