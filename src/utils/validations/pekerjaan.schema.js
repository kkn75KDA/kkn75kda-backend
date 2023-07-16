const Joi = require('joi');

const pekerjaanSchema = Joi.object({
  nama: Joi.string().required,
});

module.exports = pekerjaanSchema;
