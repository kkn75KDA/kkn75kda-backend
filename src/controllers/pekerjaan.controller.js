const { getAllPekerjaan } = require('../utils/services/pekerjaan.service');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const pekerjaan = await getAllPekerjaan();

      return res.status(200).json({
        status: true,
        message: 'success!',
        data: { pekerjaan },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
