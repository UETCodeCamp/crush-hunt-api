const VotePost = require('../models/VotePost');

exports.vote = ({userId, postId}) => {
    return VotePost.findOne({
        post: postId,
        owner: userId
    }).then(vote => {
        if (vote) {
            throw new Error('You voted for this post.');
        }

        const newVote = VotePost({
            post: postId,
            owner: userId
        });

        return newVote.save();
    });
};