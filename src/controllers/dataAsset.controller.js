const path = require('path');

const {
  createDataAssetSchema,
  updateDataAssetSchema,
} = require('../utils/validations/dataAsset.schema');
const {
  getAllDataAsset,
  getDataAssetByKK,
  createDataAsset,
  updateDataAsset,
  deleteDataAsset,
  importCsv,
} = require('../utils/services/dataAsset.service');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const assets = await getAllDataAsset();

      return res.status(200).json({ status: true, message: 'success', data: { assets } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  getByKK: async (req, res, next) => {
    try {
      const { id } = req.params;

      const dataAsset = await getDataAssetByKK(id);

      if (dataAsset.status === false) {
        return res.status(404).json({ status: false, message: dataAsset.message });
      }

      return res.status(200).json({ status: true, message: 'success', data: { dataAsset } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      const { error, value } = createDataAssetSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const dataAsset = await createDataAsset(value);

      return res.status(201).json({ status: true, message: 'success', data: { dataAsset } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { error, value } = updateDataAssetSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const dataAsset = await updateDataAsset(id, value);

      if (dataAsset.status === false) {
        return res.status(404).json({ status: false, message: dataAsset.message });
      }

      return res.status(200).json({ status: true, message: `Asset Data with id ${id} updated!` });
    } catch (error) {
      next(error);
    }
    return null;
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const dataAsset = await deleteDataAsset(id);

      if (dataAsset.status === false) {
        return res.status(404).json({ status: false, message: dataAsset.message });
      }

      return res
        .status(200)
        .json({ status: true, message: `Asset data with no.kk ${id} deleted!` });
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
      await importCsv(fileUrl);

      return res.status(201).json({ status: true, message: 'Import data asset success!' });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
