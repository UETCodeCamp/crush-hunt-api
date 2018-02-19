const Post = require('../models/Post');

exports.create = ({userId, title, url}) => {
    const post = Post({
        owner: userId,
        title,
        url
    });

    return post.save();
};

exports.detail = ({postId, userId}) => {
    console.log(userId);

    return Post.findById(postId)
        .populate('owner');
};

exports.delete = ({userId, postId}) => {
    return Post.remove({
        _id: postId,
        owner: userId,
    });
};
