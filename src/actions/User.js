const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Favorite = require('../models/Favorite');
const VotePost = require('../models/VotePost');

exports.getProfile = (userId) => {
    return User.findById(userId);
};

exports.getMyPosts = ({userId, page, limit}) => {
    const skip = (page - 1) * limit;

    return Post
        .find({
            owner: userId
        })
        .skip(skip)
        .limit(limit);
};

exports.getMyVotes = ({userId, page, limit}) => {
    const skip = (page - 1) * limit;

    return VotePost
        .find({
            owner: userId
        })
        .populate('post')
        .skip(skip)
        .limit(limit);
};

exports.getMyComments = ({userId, page, limit}) => {
    const skip = (page - 1) * limit;

    return Comment
        .find({
            owner: userId
        })
        .populate('post')
        .skip(skip)
        .limit(limit);
};

exports.getMyFavorites = ({userId, page, limit}) => {
    const skip = (page - 1) * limit;

    return Favorite
        .find({
            owner: userId
        })
        .populate('post')
        .skip(skip)
        .limit(limit);
};