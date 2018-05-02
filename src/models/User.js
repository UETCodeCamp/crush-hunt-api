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
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date,
    },
    created: {
        type: Date,
        default: Date.now
    },
});

userSchema.methods.toJSON = function () {
    const object = this.toObject();
    delete object.password;
    delete object.resetPasswordToken;
    delete object.resetPasswordExpires;

    return object;
};

module.exports = connection.model('User', userSchema);