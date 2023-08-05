const prisma = require('../libs/prisma.config');

module.exports = {
  getAllPendidikan: async () => {
    const pendidikan = await prisma.pendidikan.findMany();

    return pendidikan;
  },

  getPedidikanById: async (id) => {
    const pendidikan = await prisma.pendidikan.findUnique({ where: { id: parseInt(id, 10) } });

    if (!pendidikan) {
      return {
        status: false,
        message: `Pendidikan with id ${id} not exist!`,
      };
    }

    return pendidikan;
  },

  getPedidikanByName: async (namaPendidikan) => {
    const pendidikan = await prisma.pendidikan.findUnique({ where: { nama: namaPendidikan } });

    return pendidikan;
  },

  createPendidikan: async (data) => {
    const pendidikan = await prisma.pendidikan.create({
      data: {
        nama: data.nama,
      },
    });

    return pendidikan;
  },

  updatePendidikan: async (id, data) => {
    const findPendidikan = await prisma.pendidikan.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findPendidikan) {
      return {
        status: false,
        message: `Pendidikan with id ${id} not exist!`,
      };
    }

    const pendidikan = await prisma.pendidikan.update({ where: { id: parseInt(id, 10) }, data });

    return pendidikan;
  },

  deletePendidikan: async (id) => {
    const findPendidikan = await prisma.pendidikan.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findPendidikan) {
      return {
        status: false,
        message: `Pendidikan with id ${id} not exist!`,
      };
    }

    const pendidikan = await prisma.pendidikan.delete({ where: { id: parseInt(id, 10) } });

    return pendidikan;
  },
};
