const {
  getAllAsset,
  createAsset,
  updateAsset,
  deleteAsset,
} = require('../utils/services/asset.service');
const assetSchema = require('../utils/validations/asset.validation');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const assets = await getAllAsset();

      return res.status(200).json({ status: true, message: 'success', data: { assets } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      const { error, value } = assetSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const asset = await createAsset(value);

      return res.status(201).json({ status: true, message: 'success', data: { asset } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { error, value } = assetSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const asset = await updateAsset(id, value);

      if (asset.status === false) {
        return res.status(404).json({ status: false, message: asset.message });
      }

      return res.status(200).json({ status: true, message: `Asset with id ${id} updated!` });
    } catch (error) {
      next(error);
    }
    return null;
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const asset = await deleteAsset(id);

      if (asset.status === false) {
        return res.status(404).json({ status: false, message: asset.message });
      }

      return res.status(200).json({ status: true, message: `Asset with id ${id} deleted!` });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
