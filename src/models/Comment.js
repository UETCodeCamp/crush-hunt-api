const Mongoose = require('mongoose');
const {Schema} = Mongoose;
const connection = require('../app.database');

const commentSchema = new Schema({
    post: {
        type: Schema.ObjectId,
        index: true
    },
    owner: {
        type: Schema.ObjectId,
        index: true,
    },
    content: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = connection.model('Comment', commentSchema);