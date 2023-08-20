const Joi = require('joi');

const createPerangkatDesaSchema = Joi.object({
  nama: Joi.string().required(),
  photo: Joi.string().optional(),
  jabatan: Joi.string().required(),
});

const updatePerangkatDesaSchema = Joi.object({
  nama: Joi.string().optional(),
  photo: Joi.string().optional(),
  jabatan: Joi.string().optional(),
});

module.exports = { createPerangkatDesaSchema, updatePerangkatDesaSchema };
