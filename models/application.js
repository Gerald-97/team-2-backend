const mongoose = require('mongoose');
const Schema = mongoose.Schema

const applicationSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    birthday: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    school: {
        type: String,
        require: true
    },
    courseOfStudy: {
        type: String,
        require: true
    },
    cgpa: {
        type: Number,
        require: true
    },
    file: {

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('application', applicationSchema)