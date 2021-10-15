const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token recieved'
        });
    }

    try {
        const { userId } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - auth user does not exist'
            });
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid token - auth user state: false'
            });
        }

        req.authUser = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validateJWT
}