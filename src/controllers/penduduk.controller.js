const path = require('path');
const {
  getAllPenduduk,
  getPendudukByKK,
  createPenduduk,
  importPenduduk,
} = require('../utils/services/penduduk.service');
const { createPendudukSchema } = require('../utils/validations/penduduk.schema');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const residents = await getAllPenduduk();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { residents },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  getByKK: async (req, res, next) => {
    try {
      const { noKK } = req.params;

      const resident = await getPendudukByKK(noKK);

      if (!resident) {
        return res.status(204).json({
          status: false,
          message: `Penduduk with no.kk ${noKK} isn't exist!`,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { resident },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      const { error, value } = createPendudukSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const resident = await createPenduduk(value);

      return res.status(201).json({
        status: true,
        message: 'success',
        data: { resident },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  importCsv: async (req, res, next) => {
    try {
      const fileUrl = path.join('uploads/penduduk/', req.file.filename);
      const penduduk = await importPenduduk(fileUrl);
    } catch (error) {
      next(error);
    }
  },
};
