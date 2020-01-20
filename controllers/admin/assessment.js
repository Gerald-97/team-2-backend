const Assessment = require("../../models/assessment");
const dotenv = require("dotenv").config();

const AssessmentEntry = async (req, res, next) => {
    try {
        const {
            question,
            answer,
            options
        } = req.body;
        const file = req.files.file;
        if (!req.user) {
            return res.status(401).json({
                message: "You are not an Admin"
            })
        } else {
            await file.mv("public/questions/" + file.name);
            const data = await Assessment.findOne({
                question
            });
            if (data) {
                return res.status(401).json({
                    message: 'Question already in the database'
                })
            } else {
                const newEntry = new Assessment({
                    file,
                    question,
                    answer,
                    options
                });
                await newEntry.save();
                return res.status(201).json({
                    message: "Assessment Created"
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
        if (!req.user) {
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
                    message: "Applcation Updated"
                });
            }
        }
    } catch (err) {
        return next(err);
    }
};

const AssessmentDelete = async (req, res, next) => {
    try {
        if (!req.user) {
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
        const data = await Assessment.find();
        return res.status(200).json({
            message: "Questions",
            data
        });
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