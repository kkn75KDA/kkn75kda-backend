const {
  getAllPendidikan,
  getPedidikanById,
  createPendidikan,
  updatePendidikan,
  deletePendidikan,
} = require('../utils/services/pendidikan.service');
const {
  createPendidikanSchema,
  updatePendidikanSchema,
} = require('../utils/validations/pendidikan.schema');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const pendidikan = await getAllPendidikan();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { pendidikan },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const pendidikan = await getPedidikanById(id);

      if (pendidikan.status === false) {
        return res.status(404).json({
          status: false,
          message: pendidikan.message,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { pendidikan },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      const { error, value } = createPendidikanSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const pendidikan = await createPendidikan(value);

      return res.status(201).json({
        status: true,
        message: 'success',
        data: { pendidikan },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { error, value } = updatePendidikanSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const pendidikan = await updatePendidikan(id, value);

      if (pendidikan.status === false) {
        return res.status(404).json({
          status: false,
          message: pendidikan.message,
        });
      }

      return res.status(200).json({
        status: true,
        message: `Pendidikan with id ${id} updated!`,
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const pendidikan = await deletePendidikan(id);

      if (pendidikan.status === false) {
        return res.status(404).json({
          status: false,
          message: pendidikan.message,
        });
      }

      return res.status(200).json({
        status: true,
        message: `Pendidikan with id ${id} deleted!`,
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
