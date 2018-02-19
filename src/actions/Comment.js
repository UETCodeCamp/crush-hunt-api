const Post = require('../models/Post');
const Comment = require('../models/Comment');

const _getTotalComments = (postId) => {
    return Comment.count({
        post: postId
    });
};

exports.comment = ({userId, postId, content}) => {
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