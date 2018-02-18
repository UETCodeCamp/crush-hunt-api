const express = require('express');
const router = express.Router();

const {auth} = require('./controllers');

/**
 * Register routes.
 */
router.get('/', (req, res) => res.send('Hello!'));
router.get('/ping', (req, res) => res.send('pong'));

router.post('/login', auth.login);
router.post('/register', auth.register);

/**
 * Exports.
 */
module.exports = router;