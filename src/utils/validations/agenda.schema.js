const Joi = require('joi');

const createAgendaSchema = Joi.object({
  judul: Joi.string().required(),
  tempat: Joi.string().required(),
  tanggal: Joi.string().required(),
  waktu: Joi.string().required(),
});

const updateAgendaSchema = Joi.object({
  judul: Joi.string().optional(),
  tempat: Joi.string().optional(),
  tanggal: Joi.string().optional(),
  waktu: Joi.string().optional(),
});

module.exports = { createAgendaSchema, updateAgendaSchema };
