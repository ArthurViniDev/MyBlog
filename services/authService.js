const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: {email}
  });
}

async function createUser({name, email, password}) {
  return prisma.user.create({
    data: {name, email, password},
  })
}

module.exports = {
  findUserByEmail,
  createUser
};