const Joi = require('joi');

const createDataAssetSchema = Joi.object({
  no_kk: Joi.string().optional(),
  asset: Joi.string().optional(),
  jumlah: Joi.string().optional(),
  penghasilan: Joi.string().optional(),
});

const updateDataAssetSchema = Joi.object({
  asset: Joi.string().optional(),
  jumlah: Joi.string().optional(),
  penghasilan: Joi.string().optional(),
});

const importDataAssetSchema = Joi.object({
  no_kk: Joi.string().optional(),
  asset: Joi.string().optional(),
  jumlah: Joi.string().optional(),
  penghasilan: Joi.string().optional(),
});

module.exports = { createDataAssetSchema, updateDataAssetSchema, importDataAssetSchema };
