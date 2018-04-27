const Mongoose = require('mongoose');
const {Schema} = Mongoose;
const connection = require('../app.database');

const favoriteSchema = new Schema({
    post: {
        type: Schema.ObjectId,
        index: true,
    },
    owner: {
        type: Schema.ObjectId,
        index: true,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = connection.model('Favorite', favoriteSchema);