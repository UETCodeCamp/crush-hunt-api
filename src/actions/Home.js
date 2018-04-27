const Post = require('../models/Post');
const User = require('../models/User');

/**
 * Sort by number of total votes.
 */
exports.hot = ({page = 1, limit = 10}) => {
    const skip = (page - 1) * limit;

    return Post
        .find({
            status: 'publish'
        })
        .sort({
            totalVotes: 1
        })
        .skip(skip)
        .limit(limit);
};

/**
 * Sort by score
 */
exports.trending = ({page = 1, limit = 10}) => {
    const skip = (page - 1) * limit;

    return Post
        .find({
            status: 'publish'
        })
        .populate('owner')
        .sort({
            scoreTrend: 1
        })
        .skip(skip)
        .limit(limit);
};

/**
 * Sort by created time.
 */
exports.fresh = ({page = 1, limit = 10}) => {
    const skip = (page - 1) * limit;

    return Post
        .find({
            status: 'publish'
        })
        .sort({
            created: 1
        })
        .skip(skip)
        .limit(limit);
};