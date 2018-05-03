const Post = require('../models/Post');
const VotePost = require('../models/VotePost');
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
    if (!url) {
        return Promise.reject(new Error('Url must be not empty.'));
    }

    if (!title) {
        return Promise.reject(new Error('Title must be not empty.'));
    }

    const post = new Post({
        owner: userId,
        title,
        url,
        status: 'publish'
    });

    return post.save();
};

exports.detail = ({postId, userId}) => {
    return Post.findById(postId)
        .populate('owner')
        .then(post => {
            if (!post) {
                throw new Error('Post not found!');
            }

            return Promise.resolve(post);
        })
        .then(post => {
            const postId = post.get('_id');
            const postObject = post.toJSON();

            if (userId) {
                return VotePost.findOne({
                    owner: userId,
                    post: postId,
                }).then(vote => {
                    const voted = !!vote;
                    const object = Object.assign({}, postObject, {voted});

                    return Promise.resolve(object);
                });
            }

            return Promise.resolve(postObject);
        });
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

            console.log(score);

            return post.update({
                $set: {
                    scoreTrend: score.toFixed(5)
                }
            });
        }).then(() => {
            return Post.findById(postId);
        });
};

exports.computedTotalVotes = (postId) => {
    return Promise.all([
        Post.findById(postId),
        VotePost.count({post: postId})
    ]).then(([post, totalVotes]) => {
        if (!post) {
            throw new Error('Post not found.');
        }

        post.totalVotes = totalVotes;

        return post.save();
    });
};