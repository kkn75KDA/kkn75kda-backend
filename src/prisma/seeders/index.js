/* eslint-disable no-console */
const bcrypt = require('bcrypt');

const prisma = require('../../utils/libs/prisma.config');

const pekerjaan = require('./data/pekerjaan.json');
const pendidikan = require('./data/pendidikan.json');
const jabatan = require('./data/jabatan.json');
const asset = require('./data/asset.json');
const penghasilan = require('./data/penghasilan.json');

async function main() {
  const hashPassword = await bcrypt.hash('admin123', 10);
  const userData = {
    nama: 'Admin',
    email: 'admin@gmail.com',
    password: hashPassword,
  };

  await prisma.user.create({ data: userData });
  await prisma.pekerjaan.createMany({ data: pekerjaan, skipDuplicates: true });
  await prisma.pendidikan.createMany({ data: pendidikan, skipDuplicates: true });
  await prisma.jabatan.createMany({ data: jabatan, skipDuplicates: true });
  await prisma.asset.createMany({ data: asset, skipDuplicates: true });
  await prisma.penghasilan.createMany({ data: penghasilan, skipDuplicates: true });
}

main()
  .then(async () => {
    console.log('Success Bang!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
