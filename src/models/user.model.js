const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = mongoose.Schema({
    name: {
        type: String(),
        unqiue: true,
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

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.passwordChangeAt = Date.now();
    this.password = await bcrypt.hash(this.password, 4);
});


const User = mongoose.model('User', UserSchema);

module.exports = User;