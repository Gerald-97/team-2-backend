const mongoose =  require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, require: true},
    phoneNumber: {type: Number, require: true},
    password: {type: String, require: true},
    isAdmin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', userSchema)