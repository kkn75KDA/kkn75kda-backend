const prisma = require('../libs/prisma.config');

module.exports = {
  getAllPekerjaan: async () => {
    const pekerjaan = await prisma.pekerjaan.findMany();

    return pekerjaan;
  },

  getPekerjaanByName: async (namaPekerjaan) => {
    const pekerjaan = await prisma.pekerjaan.findUnique({ where: { nama: namaPekerjaan } });

    return pekerjaan;
  },
};
