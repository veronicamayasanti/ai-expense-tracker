const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function seed() {
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'maya@engineer.com' },
    update: {},
    create: {
      name: 'Maya AI Engineer',
      email: 'maya@engineer.com',
      password: hashedPassword,
      avatar: 'https://ui-avatars.com/api/?name=Maya+AI+Engineer&background=10b981&color=fff'
    }
  });
  
  console.log('Seed Successful!');
  console.log('Email:', user.email);
  console.log('Password:', password);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
}).finally(() => prisma.$disconnect());
