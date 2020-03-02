const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppSchema = new Schema({
    //add the required:true
    fileapplicant: {},
    batch: {
        type: Number
    },
    link: {
        type: String
    },
    date: {
        type: String
    },
    instructions: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('AppCreate', AppSchema);