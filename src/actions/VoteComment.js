const VoteComment = require('../models/VoteComment');
const Comment = require('../models/Comment');

exports.vote = ({userId, commentId}) => {
    return Promise.all([
        Comment.findById(commentId),
        VoteComment.findOne({
            comment: commentId,
            owner: userId
        })
    ]).then(([comment, vote]) => {
        if (vote) {
            throw new Error('You voted for this comment.');
        }

        if (!comment) {
            throw new Error('Comment not found.');
        }

        const newVote = new VoteComment({
            comment: commentId,
            owner: userId
        });

        return newVote.save()
            .then(vote => {
                const totalVotes = comment.get('totalVotes');

                return comment.update({
                    $set: {
                        totalVotes: totalVotes + 1
                    }
                }).then(() => {
                    return Promise.resolve(vote);
                });
            });
    });
};

exports.unVote = ({userId, commentId}) => {
    return Promise.all([
        Comment.findById(commentId),
        VoteComment.findOne({
            comment: commentId,
            owner: userId
        })
    ]).then(([comment, vote]) => {
        if (!vote) {
            throw new Error('You have not voted this comment.');
        }

        if (!comment) {
            throw new Error('Comment not found.');
        }

        return vote.remove()
            .then((result) => {
                const totalVotes = comment.get('totalVotes');

                return comment.update({
                    $set: {
                        totalVotes: totalVotes - 1
                    }
                }).then(() => {
                    return Promise.resolve(result);
                });
            });
    });
};