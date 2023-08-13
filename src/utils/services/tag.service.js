const prisma = require('../libs/prisma.config');

module.exports = {
  getAllTag: async () => {
    const tags = await prisma.tag.findMany();

    return tags;
  },

  getTagByName: async (data) => {
    const { nama } = data;
    const tag = await prisma.tag.findFirst({ where: { nama } });

    return tag;
  },

  createTag: async (data) => {
    if (typeof data === 'object') {
      const { nama } = data;

      const findTag = await prisma.tag.findFirst({ where: { nama } });

      if (findTag) return findTag;

      const tag = await prisma.tag.create({ data: { nama } });

      return tag;
    }

    const findTag = await prisma.tag.findFirst({ where: { nama: data } });

    if (findTag) return findTag;

    const tag = await prisma.tag.create({ data: { nama: data } });

    return tag;
  },

  updateTag: async (id, data) => {
    const { nama } = data;
    const findTag = await prisma.tag.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findTag) {
      return { status: false, message: `Tag with id ${id} not exist!` };
    }

    const tag = await prisma.tag.update({
      data: { nama },
      where: { id: parseInt(id, 10) },
    });

    return tag;
  },

  deleteTag: async (id) => {
    const findTag = await prisma.tag.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findTag) {
      return { status: false, message: `Tag with id ${id} not exist!` };
    }

    const tag = await prisma.tag.delete({ where: { id: parseInt(id, 10) } });

    return tag;
  },
};
