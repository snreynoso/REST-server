const { request, response } = require('express');

const usersGet = (req = request, res = response) => {
    // Ex: http://localhost:8080/api/users?q=hello&name=Santiago&apikey=123456
    const {q, name = 'No name', apikey} = req.query;

    res.json({
        msg: 'get API - Controller',
        q,
        name,
        apikey
    });
}

const usersPost = (req, res) => {
    const { name, age } = req.body;

    res.status(201).json({
        msg: 'post API - Controller',
        name,
        age
    });
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API - Controller'
    });
}

const usersPut = (req, res) => {
    // Ex: http://localhost:8080/api/users/12 => userId = 12
    const { userId } = req.params.userId;

    res.status(500).json({
        msg: 'put API - Controller',
        userId
    });
}

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controller'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete
}