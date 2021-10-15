const { response } = require('express')

const isAdminRole = (req, res = response, next) => {
    if (!req.authUser) {
        return res.status(500).json({
            msg: 'The token validation fail...'
        });
    }

    const { role, name } = req.authUser;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} does not have Admin role!`
        });
    }

    next();
}

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.authUser) {
            return res.status(500).json({
                msg: 'The token validation fail...'
            });
        }

        if (!roles.includes(req.authUser.role)) {
            return res.status(401).json({
                msg: `You need one of this roles: ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}