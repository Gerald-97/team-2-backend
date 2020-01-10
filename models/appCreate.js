const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppSchema = new Schema({
    //add the required:true
    fileapplicant: {
        type: String
    },
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
    }
});

module.exports = mongoose.model('AppCreate', AppSchema);