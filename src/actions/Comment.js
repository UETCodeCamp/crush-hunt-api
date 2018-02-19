const Post = require('../models/Post');
const Comment = require('../models/Comment');

const _getTotalComments = (postId) => {
    return Comment.count({
        post: postId
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
    return Comment.find({
        post: postId
    }).sort({
        totalVotes: 1
    });
};

/**
 * Sort by created time.
 */
exports.listFreshComments = ({postId}) => {
    return Comment.find({
        post: postId
    }).sort({
        created: 1
    });
};