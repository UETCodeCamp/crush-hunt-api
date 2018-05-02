const Post = require('../models/Post');
const VotePost = require('../models/VotePost');

const _arrayToObject = (array, fieldId) =>
    array.reduce((obj, item) => {
        obj[item[fieldId]] = item;

        return obj;
    }, {});

/**
 * Sort by number of total votes.
 */
exports.hot = ({page = 1, limit = 10}) => {
    const skip = (page - 1) * limit;

    return Post
        .find({
            status: 'publish'
        })
        .populate('owner')
        .sort({
            totalVotes: 1
        })
        .skip(skip)
        .limit(limit);
};

/**
 * Sort by score
 */
exports.trending = ({page = 1, limit = 10, userId}) => {
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
        .limit(limit)
        .then(posts => {
            const ids = posts.map(post => {
                return post._id;
            });


            if (userId) {
                return VotePost.find({
                    post: {
                        $in: ids
                    },
                    owner: userId
                }).then(votes => {
                    const votesObject = _arrayToObject(votes, 'post');

                    const postsComputed = posts.map(post => {
                        const object = post.toJSON();
                        const voted = !!votesObject[object._id];

                        return Object.assign({}, object, {voted});
                    });

                    return Promise.resolve(postsComputed);
                });
            }

            return Promise.resolve(posts);
        });
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
        .populate('owner')
        .sort({
            created: 1
        })
        .skip(skip)
        .limit(limit);
};