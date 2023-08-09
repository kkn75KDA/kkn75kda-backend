const { Prisma } = require('@prisma/client');

const prisma = require('../libs/prisma.config');

module.exports = {
  getAllPendidikan: async () => {
    const pendidikan = await prisma.pendidikan.findMany();

    return pendidikan;
  },

  getPedidikanByName: async (namaPendidikan) => {
    const pendidikan = await prisma.pendidikan.findFirst({ where: { nama: namaPendidikan } });

    return pendidikan;
  },

  createPendidikan: async (data) => {
    const { nama } = data;

    const findPendidikan = await prisma.pendidikan.findFirst({ where: { nama } });

    if (findPendidikan) return findPendidikan;

    const pendidikan = await prisma.pendidikan.create({ data: { nama: data.nama } });

    return pendidikan;
  },

  updatePendidikan: async (id, data) => {
    try {
      const findPendidikan = await prisma.pendidikan.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!findPendidikan) {
        return { status: false, message: `Pendidikan with id ${id} not exist!` };
      }

      const pendidikan = await prisma.pendidikan.update({ where: { id: parseInt(id, 10) }, data });

      return pendidikan;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return { status: false, message: `Pendidikan with name ${data.nama} is already exists!` };
        }
      }
      throw error;
    }
  },

  deletePendidikan: async (id) => {
    const findPendidikan = await prisma.pendidikan.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findPendidikan) {
      return { status: false, message: `Pendidikan with id ${id} not exist!` };
    }

    const pendidikan = await prisma.pendidikan.delete({ where: { id: parseInt(id, 10) } });

    return pendidikan;
  },
};
