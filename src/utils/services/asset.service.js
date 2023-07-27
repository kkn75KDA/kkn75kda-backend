const prisma = require('../libs/prisma.config');

module.exports = {
  getAllAsset: async () => {
    const assets = await prisma.asset.findMany();

    return assets;
  },
};
