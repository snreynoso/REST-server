const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        requiredd: [true, 'The role is required']
    }
});

module.exports = model('Role', RoleSchema); // ('name', function)