const Post = require('../models/Post');
const Moment = require('moment');
const {getScoreTrending} = require("../helpers/common");

exports.update = ({userId, postId, title, url}) => {
    return Post.findOne({
        _id: postId,
        owner: userId
    }).then(post => {
        if (!post) {
            throw new Error('Post not found.');
        }

        return post.update({
            $set: {
                title,
                url,
                updated: Date.now()
            }
        }).then(() => Post.findById(postId));
    });
};

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

exports.computedScoreTrending = (postId) => {
    return Post.findById(postId)
        .then(post => {
            if (!post) {
                throw new Error('Post not found.');
            }

            const totalVotes = post.get('totalVotes') || 0;
            const published = Moment(post.get('published'), Date.now());
            const now = Moment();

            const age = now.diff(published);
            const score = getScoreTrending(totalVotes, age);

            return post.update({
                $set: {
                    scoreTrend: score
                }
            });
        }).then(() => {
            return Post.findById(postId);
        });
};