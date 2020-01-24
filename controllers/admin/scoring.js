const Questions = require('../../models/assessment')
const Answers = require('../../models/submitAns')
const Application = require('../../models/application')

const calcAns = async (req, res, next) => {
    try {
        const {
            questionId,
            answer
        } = req.body;
        const userEmail = req.user;
        const userP = await Application.findOne({
            email: userEmail
        })
        if (!userP) {
            return res.status(401).json({
                message: "Login to the user"
            })
        } else {
            console.log(questionId)
            console.log(answer)
            const ansSubmitted = await Answers.findOne({
                email: userEmail
            })
            if (ansSubmitted) {
                return res.status(401).json({
                    message: "You have already submitted"
                })
            } else {
                var score = 0;
                var setQuestions = [];
                var setAnswers = [];

                for (i = 0; i < questionId.length; i++) {
                    var setQs = await Questions.findById({
                        _id: questionId[i]
                    })
                    setQuestions.push(setQs)
                }
                for (let j = 0; j < setQuestions.length; j++) {
                    var setAns = setQuestions[j].ansQ
                    setAnswers.push(setAns)
                }
                for (let k = 0; k < answer.length; k++) {
                    for (let l = 0; l < setAnswers.length; l++) {
                        if (k == l) {
                            if (answer[k] == setAnswers[l]) {
                                score += 1
                            }
                        } else continue
                    }
                }
                const newAns = await new Answers({
                    score,
                    doneTest: true,
                    userEmail,
                    userProfile: userP,
                })
                newAns.save();
                return res.status(201).json({
                    message: "Answer Submitted"
                });
            }
        }
    } catch (err) {
        return next(err)
    }
}

const getScores = async (req, res, next) => {
    try {
        const data = await Answers.find()
        console.log(data)
        if (req.user !== true) {
            return res.status(401).json({
                message: "You are not an Admin"
            })
        } else {
            return res.status(201).json({
                message: "success",
                data
            })
        }
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    calcAns,
    getScores
}