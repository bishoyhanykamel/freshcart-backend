const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String(),
        trim: true,
        required: [true, 'User must have a name']
    },
    password: {
        type: String(),
        required: [true, 'User must have a password']
    },
    email: {
        type: String(),
        trim: true,
        required: [true, 'User must have an email']
    },
    passwordChangeAt: Date,
    picture: {
        type: String(),
        trim: true,
    }
})


const User = mongoose.model('User', UserSchema);

module.exports = User;