const Joi = require('joi');

const createPendudukSchema = Joi.object({
  namaLengkap: Joi.string().required(),
  nik: Joi.string().required(),
  gender: Joi.string().required(),
  tempat_lahir: Joi.string().required(),
  tanggal_lahir: Joi.string().required(),
  agama: Joi.string().required(),
  pendidikan_id: Joi.number().required(),
  pekerjaan_id: Joi.number().required(),
  status: Joi.string().required(),
  no_kk: Joi.string().required(),
  dusun: Joi.string().required(),
  rt: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .required()
    .messages({
      'string.base': 'RT must be a string',
      'string.empty': 'RT cannot be empty',
      'string.pattern.base': 'RT must consist of digits only',
      'string.length': 'RT must be between {#limit} characters long',
      'any.required': 'RT is required',
    }),
  rw: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .required()
    .messages({
      'string.base': 'RW must be a string',
      'string.empty': 'RW cannot be empty',
      'string.pattern.base': 'RW must consist of digits only',
      'string.length': 'RW must be between {#limit} characters long',
      'any.required': 'RW is required',
    }),
});

const updatePendudukSchema = Joi.object({
  namaLengkap: Joi.string().optional(),
  nik: Joi.string().optional(),
  gender: Joi.string().optional(),
  tempat_lahir: Joi.string().optional(),
  tanggal_lahir: Joi.string().optional(),
  agama: Joi.string().optional(),
  pendidikan_id: Joi.number().optional(),
  pekerjaan_id: Joi.number().optional(),
  status: Joi.string().optional(),
  no_kk: Joi.string().optional(),
  dusun: Joi.string().optional(),
  rt: Joi.string().min(3).max(3).optional(),
  rw: Joi.string().min(3).max(3).optional(),
});

module.exports = { createPendudukSchema, updatePendudukSchema };
