const Applicant = require("../../models/appCreate");
const dotenv = require("dotenv").config();

const ApplicantEntry = async (req, res, next) => {
    try {
        const {
            batch,
            link,
            date,
            instructions
        } = req.body;
        const fileapplicant = req.files.fileapplicant;

        // To find other active applications before creating a new one.

        // const adminAppl = Applicant.findOneAndUpdate({
        //     isActive: true
        // }, {
        //     isActive: false
        // })

        // for (let oldAppl of oldAppls) {
        //     oldAppl.isActive = false
        //     return oldAppls
        // }

        if (!req.user) {
            return res.status(401).json({
                message: "You are not an Admin"
            });
        } else {
            if (date < Date.now()) {
                res.status(401).json({
                    message: "The date is passed"
                })
            } else {
                fileapplicant.mv("public/application/" + fileapplicant.name, function (err) {
                    if (err) {
                        return next(err)
                    } else {
                        next();
                    }
                });
                const newEntry = await new Applicant({
                    batch,
                    link,
                    date,
                    instructions,
                    fileapplicant
                });
                await newEntry.save();
                return res.status(201).json({
                    message: "Application Created",
                    newEntry
                });
            }
        }
    } catch (err) {
        return next(err);
    }
};

// Function to hopefully track the deadlines
// (async function () {
//     var adminAppl = await Applicant.find({})
//     for (let adminApp in adminAppl) {
//         while (adminApp.date > Date.now()) {
//             adminApp.isActive = false
//             return adminApp
//         }
//     }
// })();

const ApplicantUpdate = async (req, res) => {
    try {
        const {
            Batch,
            Link,
            date,
            Instructions
        } = req.body;
        if (!req.user) {
            return res.status(401).json({
                message: "You are not an Admin"
            });
        } else {
            id = req.params.id;
            const data = await Applicant.findByIdAndUpdate({
                _id: id
            }, {
                fileapplicant: fileapplicant,
                Batch: Batch,
                Link: Link,
                date: date,
                Instructions: Instructions
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

const ApplicantDelete = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "You need to be an Admin"
            });
        } else {
            const id = req.params.id;
            const data = await Applicant.findByIdAndDelete({
                _id: id
            });
            if (err) next(err);
            if (!data) {
                return res.status(401).json({
                    message: "No Application for this id"
                });
            } else {
                res.status(201).json({
                    message: "Application deleted successfully"
                });
            }
        }
    } catch (err) {
        return next(err);
    }
};

const ApplicantDisplay = async (req, res, next) => {
    try {
        const data = await Applicant.find({}).sort({
            createdAt: -1
        });
        return res.status(200).json({
            message: "Applications",
            data
        });
    } catch (err) {
        return next(err);
    }
};

const ApplicantDisplayOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Applicant.findOne({
            _id: id
        });
        return res.status(200).json({
            message: "Application",
            data
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    ApplicantEntry,
    ApplicantUpdate,
    ApplicantDelete,
    ApplicantDisplay,
    ApplicantDisplayOne
};