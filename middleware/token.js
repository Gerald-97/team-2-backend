const User = require('../models/user');
const jwt = require('jsonwebtoken');
var dotenv = require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const authorization = await req.headers.authorization;
        if (!authorization) {
            res.status(401).json({
                message: "You do not possess an authorization"
            })
        } else {
            const token = await authorization.slice(7);
            const data = await jwt.verify(token, process.env.SECRET);
            await User.find(data);
            if (!data.isAdmin) {
                req.user = data.email
            } else {
                req.user = data.isAdmin;
            }
            next();
        }
    } catch (err) {
        return next(err)
    }
}

/*
module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            message: 'No Authorization headers found'
        })
    } else {
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return next(err);
            } else {
                User.find((err) => {
                    if (err) return next(err);
                    else {
                        req.user = decoded.isAdmin;
                        next();
                    }
                })
            }
        })
    }
}
*/