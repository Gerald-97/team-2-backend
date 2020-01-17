const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String
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
    sentEntry: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema)