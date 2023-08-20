const Joi = require('joi');

const tagSchema = Joi.object({
  nama: Joi.string().required(),
});

module.exports = tagSchema;
