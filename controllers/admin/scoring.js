const Questions = require('../../models/assessment')
const Answers = require('../../models/submitAns')
const User = require('../../models/user')

const calcAns = async (req, res, next) => {
    try {
        const {
            questionId,
            answer
        } = req.body;
        const userEmail = req.user.email;

        const userProfile = await User.findOne({
            email: userEmail
        })

        const ansSubmitted = await Answers.findById({
            email: userEmail
        })
        if (ansSubmitted) {
            res.status(401).json({
                message: "You have already submitted"
            })
        } else {

            var score = 0;
            var ansQ = [];

            const allQ = await Questions.find()

            for (let id in questionId) {
                for (let i in allQ) {
                    if (id === i._id) {
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
                userProfile: userProfile
            })
            newAns.save();
            return res.status(201).json({
                message: "Answer Submitted",
                newAns,
                userProfile
            });
        }
    } catch (err) {
        return next(err)
    }
}