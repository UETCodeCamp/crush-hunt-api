const VotePost = require('../models/VotePost');
const Post = require('../models/Post');
const {MINIMUM_VOTES_TO_PUBLISH} = require('../constants/post');
const PostActions = require('../actions/Post');

const _getTotalVotes = (postId) => {
    return VotePost.count({
        post: postId
    });
};

exports.vote = ({userId, postId}) => {
    return Promise
        .all([
            Post.findById(postId),
            VotePost.findOne({
                post: postId,
                owner: userId
            })
        ])
        .then(([post, vote]) => {
            if (!post) {
                throw new Error('Post not found.');
            }

            if (vote) {
                throw new Error('You voted for this post.');
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
                    });
                });
        })
        .then(() => PostActions.computedTotalVotes(postId))
        .then(() => {
            return PostActions.computedScoreTrending(postId);
        })
        .then(() => Promise.resolve(true));
};

exports.unVote = ({userId, postId}) => {
    return Promise
        .all([
            Post.findById(postId),
            VotePost.findOne({
                post: postId,
                owner: userId
            })
        ])
        .then(([post, vote]) => {
            if (!post) {
                throw new Error('Post not found.');
            }

            if (!vote) {
                throw new Error('You have not voted for this post.');
            }

            return vote.remove();
        })
        .then(() => PostActions.computedTotalVotes(postId))
        .then(() => {
            return PostActions.computedScoreTrending(postId);
        })
        .then(() => Promise.resolve(true));
};