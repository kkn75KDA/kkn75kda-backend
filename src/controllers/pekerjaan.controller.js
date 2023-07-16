const { createPekerjaan } = require('../utils/services/pekerjaan.service');

module.exports = {
  addPekerjaan: async (req, res, next) => {
    try {
      const pekerjaan = createPekerjaan(req.body);

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
