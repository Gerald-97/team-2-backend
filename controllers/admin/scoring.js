const Questions = require('../../models/assessment')
const Answers = require('../../models/submitAns')
const User = require('../../models/user')

const calcAns = async (req, res, next) => {
    try {
        const {
            questionId,
            answer
        } = req.body;
        const userEmail = req.user;
        console.log(questionId)
        console.log(answer)
        const userP = await User.findOne({
            email: userEmail
        })
        console.log(userP)
        const ansSubmitted = await Answers.findOne({
            email: userEmail
        })
        // if (ansSubmitted) {
        //     return res.status(401).json({
        //         message: "You have already submitted"
        //     })
        // } else {

        var score = 0;
        var ansQ = [];

        const allQ = await Questions.find()

        for (let id in questionId) {
            for (let i in allQ) {
                if (id === i._id) {
                    console.log(i)
                    ansQ.push(i.answer)
                }
            }
        }
        for (let s = 0; s < answer.length; s++) {
            for (let a = 0; a < ansQ.length; a++) {
                if (s === a) {
                    if (answer[s] === ansQ[a]) {
                        return score += 1
                    }
                }
            }
        }
        const newAns = await new Answers({
            answer,
            score,
            doneTest: true,
            questionId,
            userEmail,
            userProfile: userP
        })
        newAns.save();
        return res.status(201).json({
            message: "Answer Submitted",
            newAns,
            userP
        });
        // }
    } catch (err) {
        return next(err)
    }
}

module.exports = calcAns