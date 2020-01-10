const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    //add the required:true
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Admin', AdminSchema);