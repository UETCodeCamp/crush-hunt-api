const Mongoose = require('mongoose');
const {Schema} = Mongoose;
const connection = require('../app.database');

const votePostSchema = new Schema({
    post: {
        type: Schema.ObjectId,
        index: true,
    },
    owner: {
        type: Schema.ObjectId,
        index: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = connection.model('VotePost', votePostSchema);