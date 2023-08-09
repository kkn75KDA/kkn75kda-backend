const Joi = require('joi');

const createPerangkatDesaSchema = Joi.object({
  nik_id: Joi.string().required(),
  photo: Joi.string().required(),
  jabatan: Joi.string().required(),
});

const updatePerangkatDesaSchema = Joi.object({
  nik_id: Joi.string().optional(),
  photo: Joi.string().optional(),
  jabatan: Joi.string().optional(),
});

module.exports = { createPerangkatDesaSchema, updatePerangkatDesaSchema };
