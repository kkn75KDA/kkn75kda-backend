const Joi = require('joi');

const createTagSchema = Joi.object({
  nama: Joi.string().required(),
});

const updateTagSchema = Joi.object({
  nama: Joi.string().required(),
});

module.exports = { createTagSchema, updateTagSchema };
