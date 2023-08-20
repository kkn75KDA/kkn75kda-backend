const {
  getAllPekerjaan,
  createPekerjaan,
  updatePekerjaan,
  deletePekerjaan,
} = require('../utils/services/pekerjaan.service');
const pekerjaanSchema = require('../utils/validations/pekerjaan.schema');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const pekerjaan = await getAllPekerjaan();

      return res.status(200).json({ status: true, message: 'success!', data: { pekerjaan } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      const { error, value } = pekerjaanSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const pekerjaan = await createPekerjaan(value);

      return res.status(201).json({ status: true, message: 'success', data: { pekerjaan } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { error, value } = pekerjaanSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const pekerjaan = await updatePekerjaan(id, value);

      if (pekerjaan.status === false) {
        return res.status(404).json({ status: false, message: pekerjaan.message });
      }

      return res.status(200).json({ status: true, message: `Pekerjaan with id ${id} updated!` });
    } catch (error) {
      next(error);
    }
    return null;
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const pekerjaan = await deletePekerjaan(id);

      if (pekerjaan.status === false) {
        return res.status(404).json({ status: false, message: pekerjaan.message });
      }

      return res.status(200).json({ status: true, message: `Pekerjaan with id ${id} deleted!` });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
