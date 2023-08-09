const Joi = require('joi');

const pendidikanSchema = Joi.object({
  nama: Joi.string().required(),
});

module.exports = pendidikanSchema;
