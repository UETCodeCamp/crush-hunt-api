const Mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
    Mongoose.set('debug', true);
}

/**
 * Connect to database.
 *
 * @param options
 * @returns {Connection}
 */
module.exports = (options) => {
    if (!options.uri) {
        throw new Error("'uri' is required.");
    }

    // If the node process ends, close the mongoose connection
    process.on('SIGINT', () => {
        Mongoose.connection.close(() => {
            console.log('Mongo Database disconnected through app termination.');
            process.exit(0);
        });
    });

    return Mongoose
        .createConnection(options.uri, {}, () => {
            console.log('MongoDB is connected.');
        });
};
