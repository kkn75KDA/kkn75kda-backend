const Joi = require('joi');

const createArtikelSchema = Joi.object({
  thumbnail: Joi.string().required(),
  judul: Joi.string().required(),
  isi: Joi.string().required(),
  tag: Joi.string().required(),
});

const updateArtikelSchema = Joi.object({
  thumbnail: Joi.string().optional(),
  judul: Joi.string().optional(),
  isi: Joi.string().optional(),
  tag: Joi.string().optional(),
});

module.exports = { createArtikelSchema, updateArtikelSchema };
