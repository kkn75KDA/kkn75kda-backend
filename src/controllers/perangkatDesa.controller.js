const {
  getAllPerangkatDesa,
  updatePerangkatDesa,
} = require('../utils/services/perangkatDesa.service');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const perangkatDesa = await getAllPerangkatDesa();

      return res.status(200).json({
        status: true,
        message: 'success!',
        data: { perangkatDesa },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  updatePerangkat: async (req, res, next) => {
    try {
      const { id } = req.params;

      await updatePerangkatDesa(req.body, id);

      return res.status(200).json({
        status: true,
        message: 'success!',
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
