/**
 * Add configuration
 */
const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'development';
dotenv.load({path: `${environment}.env`});

/**
 * Run app.
 */
require('./src/app');