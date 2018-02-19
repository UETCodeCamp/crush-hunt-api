const Post = require('../models/Post');

/**
 * Sort by number of total votes.
 */
exports.hot = ({page = 1, limit = 10}) => {
    const skip = (page - 1) * limit;

    Post
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

    Post
        .find({
            status: 'publish'
        })
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

    Post
        .find({
            status: 'publish'
        })
        .sort({
            created: 1
        })
        .skip(skip)
        .limit(limit);
};