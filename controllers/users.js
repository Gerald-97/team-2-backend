const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Note = require('../models/application');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

/*A NEW USER CAN REISTER */
const signup = async(req, res, next) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    try {
        const data = await User.findOne({ email });
        if (data) {
            return res.status(401).json({
                message: 'There is an existing user with this email address'
            })
        } else {
            const saltRounds = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = await new User({
                firstName,
                lastName,
                phoneNumber,
                password: hash,
                email
            })
            await newUser.save();
            return res.status(201).json({
                message: 'Thank you for signing up on our site'
            })
        }
    } catch (err) {
        return next(err)
    }
}

/* A  REGISTERED USER CAN LOGIN AND GET AN AUTHORIZATION TOKEN */
const login = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        const data = await User.findOne({ email });
        if (!data) {
            return res.status(401).json({
                message: 'User does not exist'
            })
        } else {
            const match = await bcrypt.compare(password, data.password);
            if (!match) {
                return res.status(401).json({
                    message: 'Invalid login details'
                })
            } else {
                const token = await jwt.sign({ isAdmin: data.isAdmin }, process.env.SECRET, { expiresIn: "7h" })
                return res.status(200).json({
                    message: 'Login successful',
                    token
                })
            }
        }
    } catch (err) {
        return next(err)
    }
};


/* GETTING TOTAL REGISTERED USERS */
const allUsers = async(req, res, next) => {
    try {
        const data = await User.find({})
        return res.status(200).json({ data })

    } catch (err) {
        return next(err)
    }
};

const deleteUser = (req, res, next) => {
    const id = req.params.id
    User.findByIdAndDelete({ _id: id }, (err, data) => {
        if (!data) {
            return res.status(401).json({ message: "User doesn't exist" })
        } else {
            return res.status(200).json({
                message: 'User deleted successfuuly'
            })
        }
    })
}

module.exports = { signup, login, allUsers, deleteUser };