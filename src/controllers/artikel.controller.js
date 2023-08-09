/* eslint-disable prefer-destructuring */
const {
  getAllArtikel,
  getArtikelbyId,
  createArtikel,
  updateArtikel,
  deleteArtikel,
} = require('../utils/services/artikel.service');
const { createArtikelSchema, updateArtikelSchema } = require('../utils/validations/artikel.schema');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const artikels = await getAllArtikel();

      return res.status(200).json({ status: true, message: 'success', data: { artikels } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const artikel = await getArtikelbyId(id);

      if (artikel.status === false) {
        return res.status(404).json({ status: false, message: artikel.message });
      }

      return res.status(200).json({ status: true, message: 'success', data: { artikel } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      req.body.thumbnail = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const { error, value } = createArtikelSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const artikel = await createArtikel(value);

      return res.status(201).json({ status: true, message: 'success', data: { artikel } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      req.body.thumbnail = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const { error, value } = updateArtikelSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const artikel = await updateArtikel(id, value);

      if (artikel.status === false) {
        return res.status(404).json({ status: false, message: artikel.message });
      }

      return res.status(200).json({ status: true, message: `Artikel with id ${id} updated!` });
    } catch (error) {
      next(error);
    }
    return null;
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const artikel = await deleteArtikel(id);

      if (artikel.status === false) {
        return res.status(404).json({ status: false, message: artikel.message });
      }

      return res.status(200).json({ status: true, message: `artikel with id ${id} deleted!` });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
