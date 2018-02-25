const VotePost = require('../models/VotePost');
const Post = require('../models/Post');
const {MINIMUM_VOTES_TO_PUBLISH} = require('../constants/post');
const PostActions = require('../actions/Post');

exports.vote = ({userId, postId}) => {
    return Promise.all([
        Post.findById(postId),
        VotePost.findOne({
            post: postId,
            owner: userId
        })
    ]).then(([post, vote]) => {
        if (vote) {
            throw new Error('You voted for this post.');
        }

        if (!post) {
            throw new Error('Post not found.');
        }

        const newVote = new VotePost({
            post: postId,
            owner: userId
        });

        return newVote.save()
            .then(vote => {
                const totalVotes = post.get('totalVotes');
                const status = post.get('status');

                let setPost = {
                    totalVotes: totalVotes + 1,
                };

                if (totalVotes >= MINIMUM_VOTES_TO_PUBLISH && status !== 'publish') {
                    setPost = Object.assign({}, setPost, {
                        status: 'publish',
                        published: Date.now()
                    });
                }

                return post.update({
                    $set: setPost
                }).then(() => {
                    return PostActions.computedScoreTrending(postId);
                }).then(() => Promise.resolve(vote));
            });
    })
};

exports.unVote = ({userId, postId}) => {
    return VotePost.findOne({
        post: postId,
        owner: userId
    }).then(vote => {
        if (!vote) {
            throw new Error('You have not voted this post.');
        }

        return vote.remove()
            .then(() => {
                return PostActions.computedScoreTrending(postId);
            });
    });
};