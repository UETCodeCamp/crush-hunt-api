const express = require('express');
const router = express.Router();

const {auth, home, post, user} = require('./controllers');

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
router.get('/post/:id', auth.isAuthorized, post.detail);
router.put('/post/:id', auth.isAuthorized, post.create);
router.post('/post/:id', auth.isAuthorized, post.update);
router.delete('/post/:id', auth.isAuthorized, post.delete);
router.put('/post/:id/comment', auth.isAuthorized, post.comment);
router.put('/post/:id/vote', auth.isAuthorized, post.vote);

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