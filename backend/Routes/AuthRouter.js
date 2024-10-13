const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthMiddleware');

const router = require('express').Router();

// Corrected route paths
router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);

module.exports = router;
