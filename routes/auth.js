// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const registerMiddleware = require('../middlewares/validateRegister');
const loginMiddleware = require('../middlewares/validateLogin');

router.post('/register', registerMiddleware, register);
router.post('/login', loginMiddleware, login);

module.exports = router;
