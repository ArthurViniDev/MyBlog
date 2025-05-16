const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const userExists = await prisma.user.findUnique({
      where: { email: email }
    })
    if (userExists) {
      return res.status(400).json({
        error: 'User already exists in the database!'
      });
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    res.status(201).send('User successfully registered!');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    if (user.password === password) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(400).json({ error: 'Incorrect password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;