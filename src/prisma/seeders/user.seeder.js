/* eslint-disable no-console */
const prisma = require('../../utils/libs/prisma.config');

async function main() {
  const userData = await prisma.user.create({
    data: {
      nama: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
    },
  });
  console.log(userData);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });