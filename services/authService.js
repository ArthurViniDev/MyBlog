const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: {email}
  });
}

async function createUser({name, email, password}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {name, email, password: hashedPassword},
  })
}

module.exports = {
  findUserByEmail,
  createUser
};