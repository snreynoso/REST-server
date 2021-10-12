const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');
const { validateRole, emailExists, userExistsById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', usersGet);

router.put('/:userId', [
    check('userId', 'The ID is not valid').isMongoId(),
    check('userId').custom(userExistsById),
    check('role').custom(validateRole),
    validateFields
], usersPut);

router.post('/', [
    check('name', 'The name is empty').not().isEmpty(),
    check('password', 'The password must be at least 6 letters').isLength({ min: 6 }),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(validateRole), // (role) => validateRole(role) ==>> validateRole
    validateFields
], usersPost);

router.delete('/:userId', [
    check('userId', 'The ID is not valid').isMongoId(),
    check('userId').custom(userExistsById),
    validateFields
], usersDelete);

router.patch('/', usersPatch);

module.exports = router;