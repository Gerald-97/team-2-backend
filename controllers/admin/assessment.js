const Assessment = require("../../models/assessment");
const Answers = require('../../models/submitAns')
const dotenv = require("dotenv").config();

function shuffle(array) {
    var m = array.length,
        t,
        i;

    while (m) {
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

const AssessmentEntry = async (req, res, next) => {
    try {
        const {
            question,
            answer,
            options
        } = req.body;
        const file = req.files.file;
        const ansQ = options[answer]
        if (req.user !== true) {
            return res.status(401).json({
                message: "You are not an Admin"
            })
        } else {
            const data = await Assessment.findOne({
                question
            });
            if (data) {
                return res.status(401).json({
                    message: 'Question already in the database'
                })
            } else {
                await file.mv("public/questions/" + file.name);
                const newEntry = new Assessment({
                    question,
                    answer,
                    options,
                    ansQ
                });
                await newEntry.save();
                return res.status(201).json({
                    message: "Assessment Created",
                    newEntry
                });
            }
        }
    } catch (err) {
        return next(err);
    }
};

const AssessmentUpdate = async (req, res) => {
    try {
        const {
            question,
            answer,
            options
        } = req.body;
        const file = req.file.file;
        if (req.user !== true) {
            return res.status(401).json({
                message: "You are not an admin"
            });
        } else {
            const data = await Assessment.findByIdAndUpdate(req.params.id, {
                file,
                question,
                answer,
                options
            });
            if (!data) {
                return res.status(401).json({
                    message: "Invalid Application"
                });
            } else {
                return res.status(201).json({
                    message: "Assessment Updated"
                });
            }
        }
    } catch (err) {
        return next(err);
    }
};

const AssessmentDelete = async (req, res, next) => {
    try {
        if (req.user !== true) {
            return res.status(401).json({
                message: "You need to be an admin"
            });
        } else {
            const id = req.params.id;
            const data = await Assessment.findByIdAndDelete({
                _id: id
            });
            if (!data) {
                return res.status(401).json({
                    message: "No Assessment for this id"
                });
            } else {
                res.status(201).json({
                    message: "Assessment deleted successfully"
                });
            }

        }
    } catch (err) {
        return next(err)
    }
}

const AssessmentDisplay = async (req, res, next) => {
    try {
        const userEmail = req.user;
        if (userEmail === true) {
            return res.status(401).json({
                message: "You are not logged in"
            })
        } else {
            const ansSubmitted = await Answers.findOne({
                userEmail: userEmail
            })
            if (ansSubmitted) {
                return res.status(401).json({
                    message: "You have already submitted"
                })
            } else {
                const data = await Assessment.find();
                const questionData = await shuffle(data).slice(0, 30)
                return res.status(200).json({
                    message: "Questions",
                    questionData
                });
            }
        }
    } catch (err) {
        return next(err);
    }
};

const AssessmentDisplayOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Assessment.findOne({
            _id: id
        });
        return res.status(200).json({
            message: "Question",
            data
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    AssessmentEntry,
    AssessmentUpdate,
    AssessmentDisplay,
    AssessmentDisplayOne,
    AssessmentDelete
};