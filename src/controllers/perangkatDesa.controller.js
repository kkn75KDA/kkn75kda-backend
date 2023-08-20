const {
  getAllPerangkatDesa,
  getPerangkatDesaById,
  createPerangkatDesa,
  updatePerangkatDesa,
  deletePerangkat,
} = require('../utils/services/perangkatDesa.service');

const {
  createPerangkatDesaSchema,
  updatePerangkatDesaSchema,
} = require('../utils/validations/perangkatDesa.schema');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const perangkatDesa = await getAllPerangkatDesa();

      return res.status(200).json({ status: true, message: 'success!', data: { perangkatDesa } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const perangkatDesa = await getPerangkatDesaById(id);

      if (perangkatDesa.status === false) {
        return res.status(404).json({ status: false, message: perangkatDesa.message });
      }

      return res.status(200).json({ status: true, message: 'success', data: { perangkatDesa } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      req.body.photo = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const { error, value } = createPerangkatDesaSchema.validate(req.body);

      if (error) {
        return { status: false, message: error.details[0].message };
      }

      const perangkat = await createPerangkatDesa(value);

      return res.status(201).json({ status: true, message: 'success', data: perangkat });
    } catch (error) {
      next(error);
    }
    return null;
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!req.file) {
        const getPerangkat = await getPerangkatDesaById(id);
        req.body.photo = getPerangkat.photo;
      } else {
        req.body.photo = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      }
      const { error, value } = updatePerangkatDesaSchema.validate(req.body);

      if (error) {
        return { status: false, message: error.details[0].message };
      }

      const perangkat = await updatePerangkatDesa(id, value);

      if (perangkat.status === false) {
        return res.status(404).json({ status: false, message: perangkat.message });
      }

      return res
        .status(200)
        .json({ status: true, message: `Success update perangkat desa dengan id ${id} !` });
    } catch (error) {
      next(error);
    }
    return null;
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const perangkat = await deletePerangkat(id);

      if (perangkat.status === false) {
        return res.status(404).json({ status: false, message: perangkat.message });
      }

      return res
        .status(200)
        .json({ status: true, message: `Perangkat desa with id ${id} deleted!` });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
