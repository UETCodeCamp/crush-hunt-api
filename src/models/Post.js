const Mongoose = require('mongoose');
const {Schema} = Mongoose;
const connection = require('../app.database');
const isURL = require('validator/lib/isURL');

const postSchema = new Schema({
    owner: {
        type: Schema.ObjectId,
        index: true,
        ref: 'User'
    },
    title: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true,
        required: function () {
            return isURL(this.url);
        }
    },
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
    status: {
        type: String,
        default: 'pending',
        enum: ['draft', 'pending', 'publish'],
        index: true,
    },
    published: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
});

module.exports = connection.model('Post', postSchema);