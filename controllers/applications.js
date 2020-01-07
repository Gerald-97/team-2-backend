const Application = require('../models/application');
const User = require('../models/user')
const morgan = require('morgan')
var cloudinary = require('cloudinary').v2;


// New Application Entry
const newApp = async(req, res, next) => {
    const { firstName, lastName, email, birthday, address, school, courseOfStudy, cgpa, upload } = req.body;
    try {
        const newEntry = await new Application({
            firstName,
            lastName,
            email,
            birthday,
            address,
            school,
            courseOfStudy,
            cgpa,
            upload
        });
        await newEntry.save();
        return res.status(201).json({
            message: "Application sent successfully."
        });
    } catch (err) {
        return next(err)
    }
}

// Display All Applications
const totalApp = async(req, res, next) => {
    try {
        const data = await Application.find({})
        res.status(200).json({
            data
        })
    } catch (err) {
        return next(err)
    }
}

module.exports = { newApp, totalApp };