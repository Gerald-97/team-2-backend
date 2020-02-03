const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    sentEntry: {
        type: Boolean,
        default: false
    },
    takenTest: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'unverified'
    }
});

module.exports = mongoose.model('user', userSchema)