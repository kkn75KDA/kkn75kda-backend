const prisma = require('../libs/prisma.config');

module.exports = {
  getAllTag: async () => {
    const tags = await prisma.tag.findMany();

    return tags;
  },

  getTagById: async (id) => {
    const tag = await prisma.tag.findUnique({ where: { id: parseInt(id, 10) } });

    return tag;
  },

  createTag: async (data) => {
    const tag = await prisma.tag.create({
      data: {
        nama: data.nama,
      },
    });

    return tag;
  },

  updateTag: async (id, data) => {
    const tag = await prisma.tag.update({
      data: {
        nama: data.nama,
      },
      where: { id: parseInt(id, 10) },
    });

    return tag;
  },

  deleteTag: async (id) => {
    const tag = await prisma.tag.delete({ where: { id: parseInt(id, 10) } });

    return tag;
  },
};
