const Mongoose = require('mongoose');
const {Schema} = Mongoose;
const connection = require('../app.database');

const postSchema = new Schema({
    owner: {
        type: Schema.ObjectId,
        index: true,
    },
    title: {
        type: String,
        trim: true
    },
    url: {},
    totalVotes: {
        type: Number,
        index: true,
        default: 0,
    },
    totalComments: {
        type: Number,
        index: true,
        default: 0,
    },
    scoreTrend: {
        type: Number,
        index: true,
        default: 0,
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = connection.model('Post', postSchema);