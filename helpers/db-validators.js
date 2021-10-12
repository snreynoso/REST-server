const Role = require('../models/role');
const User = require('../models/user');

const validateRole = async (role = '') => {
    const validRole = await Role.findOne({ role });
    if (!validRole) {
        throw new Error(`The role: ${role} does not exist`);
    }
}

const emailExists = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`That email: ${email} has already been registered`);
    }
}

const userExistsById = async (userId = '') => {
    const userExists = await User.findById( userId );
    if (!userExists) {
        throw new Error(`The id: ${userId} does not exist`);
    }
}



module.exports = {
    validateRole,
    emailExists,
    userExistsById
}