const Application = require("../../models/application");
const Applicant = require("../../models/appCreate");
const User = require("../../models/user");
var nodemailer = require("nodemailer");
const morgan = require("morgan");
var cloudinary = require("cloudinary").v2;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL}`,
    password: `${process.env.PASSWORD}`
  }
});

// New Application Entry
const newApp = async (req, res, next) => {
  try {
    var deadlineApp = await Application.find({
      isActive: true
    });
    if (deadlineApp.date < Date.now()) {
      res.status(401).json({
        message: "Applications are closed for this cycle"
      })
    } else {

      const {
        firstName,
        lastName,
        email,
        birthday,
        address,
        school,
        courseOfStudy,
        cgpa
      } = req.body;
      const file = req.files.file;

      // const filetypes = /pdf|doc|docx/;
      // const extname = filetypes.test(upload.extname(upload.originalname).toLowerCase());
      // const mimetype = filetypes.test(upload.mimetype);
      // if (extname && mimetype) {
      //   return cb(null, true);
      // } else {
      //   cb('Error: Put in the required format')
      // }

      await file.mv("public/cv/" + file.name);
      const data = await Application.findOne({
        email
      });

      if (data) {
        return res.status(409).json({
          message: `Application for ${email} has been received already`
        });
      } else {

        // const batchID = await Applicant.findOne({
        //   isActive: true
        // })
        // var batchNumber = batchID.batch

        const newEntry = await new Application({
          firstName,
          lastName,
          email,
          birthday,
          address,
          school,
          courseOfStudy,
          cgpa,
          file
        });

        await newEntry.save();
        const content = `
        <p>Dear ${firstName},</p>
        <p>Thank you for your interest in a career opportunity at Enyata.</p>
        <p> We have received and we are currently reviewing your application.</p>
        <p> Thank you for taking the time to fill in the application form. We encourage you to visit our website at <a href='enyata.com'>enyata.com</a> for more information.</p>
        <br>
        <p>Enyata Recruitment Team</p>`;

        var message = {
          from: '"Enyata Software Engineering" <anitaogechi9@gmail.com>',
          to: `${email}`,
          subject: "Your application: Software Developer Academy",
          html: content
        };

        transporter.sendMail(message, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return res.status(201).json({
          message: "Thank you for submitting your application, we will get back to you",
          newEntry
        });
      }
    }
  } catch (err) {
    return next(err);
  }
};

// Display All Applications
const totalApp = async (req, res, next) => {
  try {
    const data = await Application.find({});
    res.status(200).json({
      data
    });
  } catch (err) {
    return next(err);
  }
};

// Display one application
const seeApp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({
      _id: id
    });
    res.status(200).json({
      data
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  newApp,
  totalApp,
  seeApp
};