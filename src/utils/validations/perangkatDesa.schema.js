const Joi = require('joi');

const perangkatDesaSchema = Joi.object({
  nik_id: Joi.string().optional(),
  photo: Joi.string.optional(),
  jabatan_id: Joi.number().optional(),
});

module.exports = perangkatDesaSchema;
