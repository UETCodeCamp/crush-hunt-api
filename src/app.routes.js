const express = require('express');
const router = express.Router();
const upload = require('./libs/upload');

const {auth, home, post, user, comment} = require('./controllers');

/**
 * Register routes.
 */
router.get('/', (req, res) => res.send('Hello!'));
router.get('/ping', (req, res) => res.send('pong'));

/**
 * Auth
 */
router.post('/login', auth.login);
router.post('/register', auth.register);

/**
 * Home
 */
router.get('/home', home.hot);
router.get('/home/hot', home.hot);
router.get('/home/trending', home.trending);
router.get('/home/fresh', home.fresh);

/**
 * Posts
 */
router.get('/post/:id', post.detail);
router.get('/post/upload', auth.isAuthorized, upload.single('image'), post.upload);
router.put('/post/:id', auth.isAuthorized, post.create);
router.post('/post/:id', auth.isAuthorized, post.update);
router.delete('/post/:id', auth.isAuthorized, post.delete);

router.get('/post/:id/comments', comment.listFreshComments);
router.get('/post/:id/comments/hot', comment.listHotComments);
router.put('/post/:id/comment', auth.isAuthorized, comment.addComment);
router.delete('/post/:id/comment/:commentId', auth.isAuthorized, comment.deleteComment);
router.post('/post/:id/comment/:commentId', auth.isAuthorized, comment.updateComment);
router.post('/post/:id/comment/:commentId/vote', auth.isAuthorized, comment.voteComment);
router.post('/post/:id/comment/:commentId/un-vote', auth.isAuthorized, comment.unVoteComment);

router.put('/post/:id/vote', auth.isAuthorized, post.vote);
router.put('/post/:id/un-vote', auth.isAuthorized, post.unVote);

/**
 * Users
 */
router.get('/user/profile', auth.isAuthorized, user.profile);
router.get('/user/comments', auth.isAuthorized, user.myComments);
router.get('/user/posts', auth.isAuthorized, user.myPosts);
router.get('/user/votes', auth.isAuthorized, user.myVotes);
router.get('/user/favorites', auth.isAuthorized, user.myFavorites);

/**
 * Exports.
 */
module.exports = router;