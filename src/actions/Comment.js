const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const _getTotalComments = (postId) => {
    return Comment.count({
        post: postId
    });
};

exports.updateComment = ({userId, commentId, content}) => {
    return Comment.findOne({
        _id: commentId,
        owner: userId
    }).then(comment => {
        if (!comment) {
            throw new Error('Email not found.');
        }

        return comment.update({
            $set: {
                content
            }
        }).then(() => Comment.findById(commentId));
    });
};

exports.addComment = ({userId, postId, content}) => {
    const _comment = new Comment({
        owner: userId,
        post: postId,
        content
    });

    return _comment.save()
        .then(comment => {

            // Compute total number of comments
            return _getTotalComments(postId)
                .then(totalComments => {
                    return Post.updateOne({
                        _id: postId
                    }, {
                        $set: {
                            totalComments
                        }
                    });
                })
                .then(() => {
                    return Promise.resolve(comment);
                });
        }).then(comment => {
            const owner = comment.get('owner');
            const objectComment = comment.toObject();

            return User.findById(owner)
                .then(user => {
                    const computedComment = Object.assign({}, objectComment, {owner: user});

                    return Promise.resolve(computedComment);
                });
        });
};

exports.deleteComment = ({userId, postId, commentId}) => {
    return Comment.remove({
        _id: commentId,
        owner: userId,
        post: postId
    });
};

/**
 * Sort by number of total votes.
 */
exports.listHostComments = ({postId}) => {
    return Comment
        .find({
            post: postId
        }).populate('owner')
        .sort({
            totalVotes: 1
        });
};

/**
 * Sort by created time.
 */
exports.listFreshComments = ({postId}) => {
    return Comment
        .find({
            post: postId
        })
        .populate('owner')
        .sort({
            created: 1
        });
};