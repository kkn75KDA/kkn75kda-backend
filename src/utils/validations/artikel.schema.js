const Joi = require('joi');

const createArtikelSchema = Joi.object({
  thumbnail: Joi.string().required(),
  judul: Joi.string().required(),
  isi: Joi.string().required(),
  tag_id: Joi.number().optional(),
  newTag: Joi.string().optional(),
});

const updateArtikelSchema = Joi.object({
  thumbnail: Joi.string().optional(),
  judul: Joi.string().optional(),
  isi: Joi.string().optional(),
  tag_id: Joi.number().optional(),
  newTag: Joi.string().optional(),
});

module.exports = { createArtikelSchema, updateArtikelSchema };
