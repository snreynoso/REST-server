const { response, json } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Check if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User or Password not valid - email check'
            });
        }

        // Check if it is an active user
        if (!user.state) {
            return res.status(400).json({
                msg: 'User or Password not valid - state false'
            });
        }

        // Check password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User or Password not valid - password check'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact the server helper'
        })
    }
}

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { email, name, picture } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) { // If does't exist
            const data = {
                name,
                email,
                password: ':P',
                img: picture,
                google: true,
                role: 'USER_ROLE'
            };

            user = new User(data);
            await user.save(); // Save in DB
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'User blocked!'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Unverified token',
            err: error
        })
    }
}
module.exports = {
    login,
    googleSignIn
}