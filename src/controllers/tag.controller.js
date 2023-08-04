const {
  getAllTag,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} = require('../utils/services/tag.service');
const { createTagSchema, updateTagSchema } = require('../utils/validations/tag.schema');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const tags = await getAllTag();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { tags },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const tag = await getTagById(id);

      if (!tag) {
        return res.status(404).json({
          status: false,
          message: `Tag with id ${id} not exist!`,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'success',
        data: { tag },
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      const { error, value } = createTagSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const tag = await createTag(value);

      return res.status(201).json({
        status: true,
        message: 'success',
        data: { tag },
      });
    } catch (error) {
      next(error);
    }

    return null;
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { error, value } = updateTagSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const tag = await updateTag(id, value);

      console.log(tag);

      return res.status(200).json({
        status: true,
        message: `Tag with ${id} updated!`,
      });
    } catch (error) {
      next(error);
    }
    return null;
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const tag = await deleteTag(id);

      console.log(tag);

      return res.status(200).json({
        status: true,
        message: `Tag with id ${id} deleted!`,
      });
    } catch (error) {
      next(error);
    }

    return null;
  },
};
