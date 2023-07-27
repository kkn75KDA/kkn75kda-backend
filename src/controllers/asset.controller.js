const { getAllAsset } = require('../utils/services/asset.service');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const assets = await getAllAsset();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { assets },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
