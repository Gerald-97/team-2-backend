const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const AssessmentSchema = new Schema({
//     fileName: {
//         data: Buffer,
//         contentType: String
//     },
//     question: {
//         type: String
//     },
//     optionA: {
//         type: String
//     },
//     optionB: {
//         type: String
//     },
//     optionC: {
//         type: String
//     },
//     optionD: {
//         type: String
//     },
//     created_at: {
//         type: Date,
//         default: Date.now
//     }
// });

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
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Assessment", AssessmentSchema);