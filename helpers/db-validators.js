const { User, Category, Role, Product } = require('../models');

// User Validators //
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

const userExistsById = async (id = '') => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`The id: ${id} does not exist`);
    }
}

// Category Validators //
const categoryExistsById = async (id = '') => {
    const categoryExists = await Category.findById(id);
    if (!categoryExists) {
        throw new Error(`The id: ${id} does not exist`);
    }
}

// Product Validators //
const productExistsById = async (id = '') => {
    const productExists = await Product.findById(id);
    if (!productExists) {
        throw new Error(`The id: ${id} does not exist`);
    }
}

module.exports = {
    validateRole,
    emailExists,
    userExistsById,
    categoryExistsById,
    productExistsById
}