const { Prisma } = require('@prisma/client');

const prisma = require('../libs/prisma.config');

module.exports = {
  getAllAsset: async () => {
    const assets = await prisma.asset.findMany();

    return assets;
  },

  getAssetByName: async (nama) => {
    const asset = await prisma.asset.findFirst({ where: { nama } });

    return asset;
  },

  createAsset: async (data) => {
    const { nama } = data;
    const findAsset = await prisma.asset.findFirst({ where: { nama } });

    if (findAsset) {
      return findAsset;
    }

    const asset = await prisma.asset.create({ data: { nama } });

    return asset;
  },

  updateAsset: async (id, data) => {
    try {
      const { nama } = data;
      const findAsset = await prisma.asset.findUnique({ where: { id: parseInt(id, 10) } });

      if (!findAsset) {
        return { status: false, message: `Asset with id ${id} not exist!` };
      }

      const asset = await prisma.asset.update({ where: { id: parseInt(id, 10) }, data: { nama } });

      return asset;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return {
            status: false,
            message: `Asset with name ${data.nama} is already exists`,
          };
        }
      }
      throw error;
    }
  },

  deleteAsset: async (id) => {
    const findAsset = await prisma.asset.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findAsset) {
      return { status: false, message: `Asset with id ${id} not exist!` };
    }

    const asset = await prisma.asset.delete({ where: { id: parseInt(id, 10) } });

    return asset;
  },
};
