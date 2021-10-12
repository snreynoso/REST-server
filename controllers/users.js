const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const stateTrue = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(stateTrue),
        User.find(stateTrue)
            .skip(Number(from)) // {{url}}/api/users?from=13
            .limit(Number(limit)) // {{url}}/api/users?limit=13
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save in DB
    await user.save();

    res.json({
        user
    });
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API - Controller'
    });
}

const usersPut = async (req, res = response) => {
    // Ex: http://localhost:8080/api/users/12 => userId = 12
    const { userId } = req.params;
    const { _id, password, google, email, ...reqBody } = req.body

    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        reqBody.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, reqBody);

    res.json(user);
}

const usersDelete = async (req, res = response) => {
    const { userId } = req.params;

    // Full delete
    //const userDeleted = await User.findByIdAndDelete(userId);

    // Delete by change state
    const userDeleted = await User.findByIdAndUpdate(userId, { state: false });

    res.json(userDeleted);
}

module.exports = {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete
}