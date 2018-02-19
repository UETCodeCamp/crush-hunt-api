const Post = require('../models/Post');

exports.create = ({userId, title, url}) => {
    const post = new Post({
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

exports.listPendingPosts = ({page = 1, limit = 10}) => {
    const skip = (page - 1) * limit;

    Post
        .find({
            status: 'pending'
        })
        .sort({
            totalVotes: 1
        })
        .skip(skip)
        .limit(limit);
};