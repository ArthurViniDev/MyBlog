const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/register', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // const userExists = users.find(user => user.email === email);
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
  res.status(201).send('Usuário registrado com sucesso!');
})

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await prisma.user.findUnique({
    where: { email: email }
  })
  if (!user) {
    return res.status(404).json({ error: 'User not exist'})
  }
  if(user.password === password) {
    return res.status(200).json({
      success: 'User login successfully!'
    })
  }else{
    return res.status(400).json({
      error: 'Incorrect password!'
    })
  }
})

module.exports = router;