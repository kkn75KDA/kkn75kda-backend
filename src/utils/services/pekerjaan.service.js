const prisma = require('../libs/prisma.config');

module.exports = {
  getAllPekerjaan: async () => {
    const pekerjaan = await prisma.pekerjaan.findMany();

    return pekerjaan;
  },

  findPekerjaanByName: async (namaPekerjaan) => {
    const pekerjaan = await prisma.$queryRaw`
    SELECT *
    FROM "Pekerjaan" p
      WHERE p.nama = ${namaPekerjaan}
    `;

    return pekerjaan;
  },
};
