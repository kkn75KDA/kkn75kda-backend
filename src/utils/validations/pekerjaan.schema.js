const Joi = require('joi');

const PekerjaanSchema = Joi.object({
  nama: Joi.string().required(),
});

module.exports = PekerjaanSchema;
