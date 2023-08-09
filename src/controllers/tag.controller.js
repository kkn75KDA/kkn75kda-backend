const { getAllTag, createTag, updateTag, deleteTag } = require('../utils/services/tag.service');
const tagSchema = require('../utils/validations/tag.schema');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const tags = await getAllTag();

      return res.status(200).json({ status: true, message: 'success', data: { tags } });
    } catch (error) {
      next(error);
    }
    return null;
  },

  create: async (req, res, next) => {
    try {
      const { error, value } = tagSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const tag = await createTag(value);

      return res.status(201).json({ status: true, message: 'success', data: { tag } });
    } catch (error) {
      next(error);
    }

    return null;
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { error, value } = tagSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }

      const tag = await updateTag(id, value);

      if (tag.status === false) {
        return res.status(404).json({ status: false, message: tag.message });
      }

      return res.status(200).json({ status: true, message: `Tag with ${id} updated!` });
    } catch (error) {
      next(error);
    }
    return null;
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const tag = await deleteTag(id);

      if (tag.status === false) {
        return res.status(404).json({ status: false, message: tag.message });
      }

      return res.status(200).json({ status: true, message: `Tag with id ${id} deleted!` });
    } catch (error) {
      next(error);
    }

    return null;
  },
};
