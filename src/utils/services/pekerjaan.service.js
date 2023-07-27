const prisma = require('../libs/prisma.config');

module.exports = {
  getAllPekerjaan: async () => {
    const pekerjaan = await prisma.pekerjaan.findMany();

    return pekerjaan;
  },
};
