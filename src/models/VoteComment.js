const Mongoose = require('mongoose');
const {Schema} = Mongoose;
const connection = require('../app.database');

const voteCommentSchema = new Schema({
    comment: {
        type: Schema.ObjectId,
        index: true,
        ref: 'Comment'
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

module.exports = connection.model('VoteComment', voteCommentSchema);