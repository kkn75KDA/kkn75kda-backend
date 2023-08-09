const Joi = require('joi');

const createAssetSchema = Joi.object({
  nama: Joi.string().required(),
});

module.exports = createAssetSchema;
