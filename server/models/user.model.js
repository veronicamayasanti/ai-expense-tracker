const prisma = require('../database/db');

async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function findUserByWhatsapp(whatsapp) {
  // Normalize number: remove 'whatsapp:' and '+' prefix
  const cleanNumber = whatsapp.replace('whatsapp:', '').replace('+', '');
  
  return await prisma.user.findFirst({
    where: { 
      OR: [
        { whatsapp: cleanNumber },
        { whatsapp: '+' + cleanNumber },
        { whatsapp: 'whatsapp:+' + cleanNumber }
      ]
    },
  });
}

async function createUser(data) {
  console.log('DEBUG: Creating user with data:', { ...data, password: '[REDACTED]' });
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      whatsapp: data.whatsapp || null,
      avatar: data.avatar || null,
    },
  });
}

async function updateUser(id, data) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

async function getUserProfile(id) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      _count: {
        select: { transactions: true },
      },
    },
  });
}

module.exports = {
  findUserByEmail,
  findUserByWhatsapp,
  createUser,
  updateUser,
  getUserProfile,
};
