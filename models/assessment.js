const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema({
    file: {
        data: Buffer,
        contentType: String
    },
    question: {
        type: String
    },
    options: {
        type: {}
    },
    answer: {
        type: Number,
    },
    ansQ: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Assessment", AssessmentSchema);