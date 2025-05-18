const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const registerMiddleware = require('../middlewares/validateRegister');
const loginMiddleware = require('../middlewares/validateLogin');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}!` });
});
router.post('/register', registerMiddleware, register);
router.post('/login', loginMiddleware, login);

module.exports = router;
