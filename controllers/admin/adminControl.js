const bcrypt = require("bcryptjs");
const Admin = require("../../models/admin");
const jwt = require("jsonwebtoken");

const adminReg = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            isAdmin
        } = req.body;
        var data = await Admin.findOne({
            email
        });
        if (data) {
            return res.status(400).json({
                message: "Admin has been registered already"
            });
        } else {
            var salt = await bcrypt.genSalt(10);
            var hash = await bcrypt.hash(password, salt);
            const newAdmin = new Admin({
                name,
                password: hash,
                email,
                isAdmin
            });
            await newAdmin.save();
            console.log(newAdmin);
            return res.status(201).json({
                message: "Admin created successfully"
            });
        }
    } catch (err) {
        return next(err);
    }
};

const adminLogin = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        var data = await Admin.findOne({
            email
        });
        if (!data) {
            return res.status(401).json({
                message: "Invalid email/password"
            });
        } else {
            var isMatch = bcrypt.compare(password, data.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid email/password"
                })
            } else {
                const token = jwt.sign({
                    isAdmin: data.isAdmin
                }, process.env.SECRET, {
                    expiresIn: '12h'
                });
                return res.status(200).json({
                    message: "Logged in successfully",
                    token
                });
            }
        }
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    adminReg,
    adminLogin
};