const Joi = require('joi');

const createPendidikanSchema = Joi.object({
  nama: Joi.string().required(),
});

const updatePendidikanSchema = Joi.object({
  nama: Joi.string().optional(),
});

module.exports = { createPendidikanSchema, updatePendidikanSchema };
