const Mongoose = require('mongoose');
const {Schema} = Mongoose;
const connection = require('../app.database');

const userSchema = new Schema({
    email: {
        type: String,
        index: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
});

userSchema.methods.toJSON = function () {
    const object = this.toObject();
    delete object.password;

    return object;
};

module.exports = connection.model('User', userSchema);