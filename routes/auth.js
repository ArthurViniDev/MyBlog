// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const registerMiddleware = require('../middlewares/validateRegister');

router.post('/register', registerMiddleware, register);
router.post('/login', login);

module.exports = router;
