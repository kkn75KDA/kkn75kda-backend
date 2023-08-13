const path = require('path');
const {
  getAllPenduduk,
  getPendudukByKK,
  createPenduduk,
  importPenduduk,
  updatePenduduk,
  deletePenduduk,
} = require('../utils/services/penduduk.service');
const {
  createPendudukSchema,
  updatePendudukSchema,
} = require('../utils/validations/penduduk.schema');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const residents = await getAllPenduduk();

      return res.status(200).json({ status: true, message: 'success', data: { residents } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  getByKK: async (req, res, next) => {
    try {
      const { noKK } = req.params;

      const resident = await getPendudukByKK(noKK);

      if (resident.status === false) {
        return res.status(404).json({ status: false, message: resident.message });
      }

      return res.status(200).json({ status: true, message: 'success', data: { resident } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      const { error, value } = createPendudukSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const resident = await createPenduduk(value);

      return res.status(201).json({ status: true, message: 'success', data: { resident } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { error, value } = updatePendudukSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const penduduk = await updatePenduduk(id, value);

      if (penduduk.status === false) {
        return res.status(404).json({ status: false, message: penduduk.message });
      }

      return res.status(200).json({ status: true, message: `Penduduk with NIK ${id} updated!` });
    } catch (error) {
      next(error);
    }
    return null;
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const penduduk = await deletePenduduk(id);

      if (penduduk.status === false) {
        return res.status(404).json({ status: false, message: penduduk.message });
      }

      return res.status(200).json({ status: true, message: `Penduduk with NIK ${id} deleted!` });
    } catch (error) {
      next(error);
    }
    return null;
  },

  importCsv: async (req, res, next) => {
    try {
      if (!req.file.filename) {
        return res.status(400).json({ status: false, message: 'File asset is required!' });
      }

      const fileUrl = path.join('uploads/penduduk/', req.file.filename);
      await importPenduduk(fileUrl);

      return res.status(200).json({ status: true, message: 'Import data penduduk success!' });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
