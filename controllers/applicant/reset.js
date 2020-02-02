
const User = require('../../models/user');


const passwordReset = function(req,res){
    UserfindOne({
        resetPasswordToken:req.params.token ,
        resetPasswordExpires:{$gt : Date.now()},
        function(err, user) {
            if (!user) {
               return res.status(404).json({
               message:'Password reset token is invalid or has expired.'
            });
              }else{
                  return res.status(201).json({
                    message:'confirmed',
                      token:req.params.token,
                      
                  })
                  
              }     
    }
});

}
const Reset = function(req,res){
    async.waterfall([
        function(done){
            User.findOne({
                resetPasswordToken:req.params.token ,
                resetPasswordExpires:{$gt : Date.now()},
                function(err, user) {
                    if (!user) {
                       return res.status(404).json({
                       message:'Password reset token is invalid or has expired.'
                    });
                }
                console.log(user)
                if(req.body.password === req.body.confirm){
                    user.setPassword(req.body.password, function(err){
                        user.resetPasswordToken = undefined
                        user.resetPasswordExpires = undefined

                        user.save(function(err){
                            done(err,user)
                        })
    
                    })
                    console.log('hello')
                    console.log(user)
                }else{
                    return res.status(404)({
                        message:'passwords do not match' })
                }
            },
        })
    },
            function(user){
            
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: `${process.env.EMAIL}`,
                      pass: `${process.env.PASSWORD}`
                    }
                  });
                        var mailOptions = {
                          from: '<anitaogechi9@gmail.com>',
                          to: user.email,
                          subject: 'Password has been changed',
                          html:'<p>This is a confirmation that the password for ' + user.email + ' has been confined</p>'
                        };
                
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          })
                          return res.status(201).json({
                            message: 'Success! Password has been changed'
                          })
                         
                        }
    ],function(err){
        if(err)return next(err)
      }
    )
}
module.exports = {passwordReset,Reset}