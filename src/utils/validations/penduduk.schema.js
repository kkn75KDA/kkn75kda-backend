const Joi = require('joi');

const createPendudukSchema = Joi.object({
  namaLengkap: Joi.string().required(),
  nik: Joi.string().required(),
  gender: Joi.string().required(),
  tempat_lahir: Joi.string().required(),
  tanggal_lahir: Joi.string().required(),
  agama: Joi.string().required(),
  pendidikan: Joi.string().required(),
  pekerjaan: Joi.string().required(),
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
  no_hp: Joi.string()
    .pattern(/^[0-9]{10,13}$/)
    .optional()
    .messages({
      'string.base': 'Phone number must be a string',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must consist of digits only',
      'string.length': 'Phone number must be between {#limit} characters long',
      'any.required': 'Phone number is required',
    }),
});

const updatePendudukSchema = Joi.object({
  namaLengkap: Joi.string().optional(),
  nik: Joi.string().optional(),
  gender: Joi.string().optional(),
  tempat_lahir: Joi.string().optional(),
  tanggal_lahir: Joi.string().optional(),
  agama: Joi.string().optional(),
  pendidikan: Joi.string().optional(),
  pekerjaan: Joi.string().optional(),
  status: Joi.string().optional(),
  no_kk: Joi.string().optional(),
  dusun: Joi.string().optional(),
  rt: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .optional()
    .messages({
      'string.base': 'RT must be a string',
      'string.empty': 'RT cannot be empty',
      'string.pattern.base': 'RT must consist of digits only',
      'string.length': 'RT must be between {#limit} characters long',
      'any.required': 'RT is required',
    }),
  rw: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .optional()
    .messages({
      'string.base': 'RW must be a string',
      'string.empty': 'RW cannot be empty',
      'string.pattern.base': 'RW must consist of digits only',
      'string.length': 'RW must be between {#limit} characters long',
      'any.required': 'RW is required',
    }),
  no_hp: Joi.string()
    .pattern(/^[0-9]{10,13}$/)
    .optional()
    .messages({
      'string.base': 'Phone number must be a string',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must consist of digits only',
      'string.length': 'Phone number must be between {#limit} characters long',
      'any.required': 'Phone number is required',
    }),
});

module.exports = { createPendudukSchema, updatePendudukSchema };
