const { Prisma } = require('@prisma/client');

const prisma = require('../libs/prisma.config');

module.exports = {
  getAllPekerjaan: async () => {
    const pekerjaan = await prisma.pekerjaan.findMany();

    return pekerjaan;
  },

  getPekerjaanByName: async (namaPekerjaan) => {
    const pekerjaan = await prisma.pekerjaan.findFirst({ where: { nama: namaPekerjaan } });

    return pekerjaan;
  },

  createPekerjaan: async (data) => {
    const { nama } = data;
    const findPekerjaan = await prisma.pekerjaan.findFirst({ where: { nama } });

    if (findPekerjaan) return findPekerjaan;

    const pekerjaan = await prisma.pekerjaan.create({ data: { nama } });

    return pekerjaan;
  },

  updatePekerjaan: async (id, data) => {
    try {
      const findPekerjaan = await prisma.pekerjaan.findUnique({ where: { id: parseInt(id, 10) } });

      if (!findPekerjaan) {
        return { status: false, message: `Pekerjaan with id ${id} not exist!` };
      }

      const pekerjaan = await prisma.pekerjaan.update({ where: { id: parseInt(id, 10) }, data });

      return pekerjaan;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return { status: false, message: `Pekerjaan with name ${data.nama} is already exists!` };
        }
      }
      throw error;
    }
  },

  deletePekerjaan: async (id) => {
    const findPekerjaan = await prisma.pekerjaan.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findPekerjaan) {
      return { status: false, message: `Pekerjaan with id ${id} not exist!` };
    }

    const pekerjaan = await prisma.pekerjaan.delete({ where: { id: parseInt(id, 10) } });

    return pekerjaan;
  },
};
