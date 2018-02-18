const express = require('express');
const app = express();
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const logger = require('morgan');
const compression = require('compression');
const cors = require('cors');

const appConfig = require('./app.config');

/**
 * Express configuration.
 */
app.disable('x-powered-by');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

/**
 * Config routes.
 */
app.use(require('./app.routes'));

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const port = appConfig.get('/port');

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});