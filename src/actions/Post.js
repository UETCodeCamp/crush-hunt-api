const Post = require('../models/Post');

exports.detail = ({postId}) => {
    return Post.findById(postId);
};

exports.delete = ({userId, postId}) => {
    return Post.remove({
        _id: postId,
        owner: userId,
    });
};
