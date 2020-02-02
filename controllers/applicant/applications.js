const Application = require("../../models/application");
const User = require("../../models/user");
var nodemailer = require("nodemailer");
const morgan = require("morgan");


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSWORD}`
    }
  });
  
  const newApp = async (req, res, next) => {
  
    try {
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
      
    await file.mv("public/cv/" + file.name);
    const data = await Application.findOne({
      email
    });
      if (data) {
        return res.status(409).json({
          message: `Application for ${email} has been received already`
        });
  
      } else {
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
  
        var mailOptions = {
          from: '"Enyata Academy" <anitaogechi9@gmail.com>',
          to: `${email}`,
          subject: 'Your application: Software Developer Academy',
          html: content
        };
  
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
        return res.status(201).json({
          message: 'Thank you for submitting your application, we will get back to you'
        })
      }
    } catch (err) {
      return next(err);
    }
  };
  // Display All Applications
const totalApp = async (req, res, next) => {
  try {
    if (req.user !== true) {
      return res.status(401).json({
        message: "You are not an Admin"
      })
    } else {
      const data = await Application.find();
      return res.status(200).json({
        data
      });
    }
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