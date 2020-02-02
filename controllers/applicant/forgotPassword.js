const User = require("../../models/user");
var nodemailer = require("nodemailer");
const async = require("async");

var crypto = require('crypto');

exports.forgotPassword = function(req,res,next){
    async.waterfall([
        function(res) {
            crypto.randomBytes(20,function(err,buf){
                var token = buf.toString('hex');
                res(err, token)

            }); 
        },
        function(token,done){
            User.findOne(
                {email : req.body.email},
                function (err, user){
                    if(!user){
                        return res.status(404).json({
                            message: `No user found with this ${email} `
                          });
                    
                    }
                    user.resetPasswordToken = token
                    user.resetPasswordExpires = Date.now() + 3600000

                     user.save(function(err){
                         done(err,token,user)
                     })
                })
        },
  function(token,user){
            
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSWORD}`
    }
  });
        var mailOptions = {
          from: '"password reset" <anitaogechi9@gmail.com>',
          to: user.email,
          subject: 'Password Reset',
          html:'<h3>Forgot Your password?</h3>' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:8080/reset?token=' + token + '\n\n' + 
          '<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }) 
          return res.status(201).json({
            message: 'An email has been sent to ' + user.email + ' with futher instructions'
          })
         
        }
    ],function(err){
      if(err)return next(err)
    }
    )
}
