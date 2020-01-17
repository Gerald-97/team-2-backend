const Assessment = require("../../models/assessment");
const dotenv = require("dotenv").config();

const AssessmentEntry = async (req, res, next) => {
    try {
        const {
            question,
            optionA,
            optionB,
            optionC,
            optionD
        } = req.body;
        const fileName = req.files.fileName;
        if (!req.user) {
            return res.status(401).json({
                message: "You are not an Admin"
            })
        } else {
            fileName.mv("public/questions/" + fileName.name, function (err) {
                if (err) {
                    console.log("Couldn't upload");
                    console.log(err);
                } else {
                    console.log("Saved!");
                }
            });
        }
        const newEntry = new Assessment({
            fileName,
            question,
            optionA,
            optionB,
            optionC,
            optionD
        });
        await newEntry.save();
        return res.status(201).json({
            message: "Assessment Created"
        });
    } catch (err) {
        return next(err);
    }
};

const AssessmentUpdate = async (req, res) => {
    try {
        const {
            question,
            optionA,
            optionB,
            optionC,
            optionD
        } = req.body;
        const fileName = req.file.fileName;
        if (!req.user) {
            return res.status(401).json({
                message: "You are not an admin"
            });
        } else {
            const data = await Assessment.findByIdAndUpdate(req.params.id, {
                fileName,
                question,
                optionA,
                optionB,
                optionC,
                optionD
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
    } catch {
        return next(err);
    }
};

// const AssessmentDelete = async (req, res, next) => {
//   try{
//   if (!req.user) {
//     return res.status(401).json({
//       message: "You need to be an admin"
//     });
//   } else {
//     const id = req.params.id;
//     const data = await Assessment.findByIdAndDelete({ _id: id });
//       if (err) next(err);
//       if (!data) {
//      return res.status(401).json({
//    message: "No Assessment for this id"});
//       } else {
//         res.status(201).json({
//           message: "Assessment deleted successfully"
//         });
//       }

//   }
// }catch {
//   return next(err)
// }
// }

const AssessmentDisplay = async (req, res, next) => {
    try {
        const data = await Assessment.find({});
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
    AssessmentDisplayOne
};