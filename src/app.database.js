const createConnection = require('./libs/createConnection');
const appConfig = require('./app.config');

module.exports = createConnection({
    uri: appConfig.get('/mongodb')
});
