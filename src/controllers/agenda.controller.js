const {
  getAllAgenda,
  getAgendaById,
  createAgenda,
  updateAgenda,
  deleteAgenda,
} = require('../utils/services/agenda.service');
const { createAgendaSchema, updateAgendaSchema } = require('../utils/validations/agenda.schema');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const agenda = await getAllAgenda();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { agenda },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const agenda = await getAgendaById(id);

      if (agenda.status === false) {
        return res.status(404).json({
          status: false,
          message: agenda.message,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { agenda },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      const { error, value } = createAgendaSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const agenda = await createAgenda(value);

      return res.status(201).json({
        status: true,
        message: 'success',
        data: { agenda },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { error, value } = updateAgendaSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const agenda = await updateAgenda(id, value);

      if (agenda.status === false) {
        return res.status(404).json({
          status: false,
          message: agenda.message,
        });
      }

      return res.status(200).json({
        status: true,
        message: `Agenda with id ${id} updated!`,
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const agenda = await deleteAgenda(id);

      if (agenda.status === false) {
        return res.status(404).json({
          status: false,
          message: agenda.message,
        });
      }

      return res.status(200).json({
        status: true,
        message: `Agenda with id ${id} deleted!`,
      });
    } catch (error) {
      next(error);
    }
    return null;
  },
};
