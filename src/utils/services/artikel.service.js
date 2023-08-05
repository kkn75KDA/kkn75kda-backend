/* eslint-disable camelcase */
const fs = require('fs');
const url = require('url');

const prisma = require('../libs/prisma.config');

module.exports = {
  getAllArtikel: async () => {
    const artikels = await prisma.artikel.findMany();

    return artikels;
  },

  getArtikelbyId: async (id) => {
    const artikel = await prisma.artikel.findUnique({ where: { id: parseInt(id, 10) } });

    if (!artikel) {
      return {
        status: false,
        message: `Artikel with id ${id} not exist!`,
      };
    }

    return artikel;
  },

  createArtikel: async (data) => {
    const { thumbnail, judul, isi, tag_id, newTag } = data;

    const findTag = await prisma.$queryRaw`
    SELECT * 
    FROM "Tag" t 
    WHERE t.nama = ${newTag}
    `;

    if (!findTag) {
      const tag = await prisma.tag.create({ data: { nama: newTag } });

      const artikel = await prisma.artikel.create({
        data: { thumbnail, judul, isi, tag_id: tag.id },
      });

      return artikel;
    }

    const artikel = await prisma.artikel.create({ data: { thumbnail, judul, isi, tag_id } });

    return artikel;
  },

  updateArtikel: async (id, data) => {
    const { thumbnail, judul, isi, newTag } = data;

    const findArtikel = await prisma.artikel.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findArtikel) {
      return {
        status: false,
        message: `Artikel with id ${id} not exist!`,
      };
    }

    const findTag = await prisma.$queryRaw`
    SELECT * 
    FROM "Tag" t 
    WHERE t.nama = ${newTag}
    `;

    if (!findTag) {
      const tag = await prisma.tag.create({ data: { nama: newTag } });
      const artikel = await prisma.artikel.update({
        data: {
          thumbnail: thumbnail || findArtikel.thumbnail,
          judul: judul || findArtikel.judul,
          isi: isi || findArtikel.Isi,
          tag_id: tag.id || findArtikel.tag_id,
        },
        where: { id: parseInt(id, 10) },
      });
      const parse = url.parse(findArtikel.thumbnail);
      fs.unlink(`uploads/${parse.pathname}`, (err) => {
        if (err) throw err;
      });

      return artikel;
    }

    const artikel = await prisma.artikel.update({ where: { id: parseInt(id, 10) }, data });
    const parse = url.parse(findArtikel.thumbnail);
    fs.unlink(`uploads/${parse.pathname}`, (err) => {
      if (err) throw err;
    });

    return artikel;
  },

  deleteArtikel: async (id) => {
    const findArtikel = await prisma.artikel.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findArtikel) {
      return {
        status: false,
        message: `Artikel with id ${id} not exist!`,
      };
    }

    const artikel = await prisma.artikel.delete({ where: { id: parseInt(id, 10) } });
    const parse = url.parse(findArtikel.thumbnail);
    fs.unlink(`uploads/${parse.pathname}`, (err) => {
      if (err) throw err;
    });

    return artikel;
  },
};
