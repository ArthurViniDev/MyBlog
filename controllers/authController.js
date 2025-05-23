const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'Segredo';

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const userExists = await authService.findUserByEmail(email);

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    await authService.createUser({name, email, password, role: 'user'});

    res.status(201).send('User registered successfully!');

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, secret, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { register, login };
