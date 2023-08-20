/* eslint-disable camelcase */
const fs = require('fs');
const url = require('url');
const { Prisma } = require('@prisma/client');

const prisma = require('../libs/prisma.config');
const { getTagByName, createTag } = require('./tag.service');

module.exports = {
  getAllArtikel: async (filter) => {
    if (filter) {
      const artikels = await prisma.$queryRaw`
      SELECT 
        a.id, 
        a.thumbnail, 
        a.judul, 
        a.isi, 
        t.nama as tag, 
        a.createdAt, 
        a.updatedAt
      FROM Artikel a 
      INNER JOIN Tag t ON a.tag_id = t.id
      WHERE t.nama = '${filter}' 
      ORDER BY a.createdAt DESC
    `;

      return artikels;
    }

    const artikels = await prisma.$queryRaw`
    SELECT 
      a.id, 
      a.thumbnail, 
      a.judul, 
      a.isi, 
      t.nama as tag, 
      a.createdAt, 
      a.updatedAt
    FROM Artikel a 
    INNER JOIN Tag t ON a.tag_id = t.id
    ORDER BY a.createdAt DESC
  `;

    return artikels;
  },

  getArtikelbyId: async (id) => {
    const artikel = await prisma.$queryRaw`
      SELECT 
        a.id, 
        a.thumbnail, 
        a.judul, 
        a.isi, 
        a.createdAt, 
        a.updatedAt, 
        t.nama as tag 
      FROM Artikel a 
      INNER JOIN Tag t ON a.tag_id = t.id
      WHERE a.id = ${id}
    `;

    if (!artikel) {
      return { status: false, message: `Artikel with id ${id} not exist!` };
    }

    return artikel;
  },

  createArtikel: async (data) => {
    const { thumbnail, judul, isi, tag } = data;

    try {
      const findTag = await getTagByName(tag);

      if (!findTag) {
        const newTag = await createTag(tag);

        const artikel = await prisma.artikel.create({
          data: { thumbnail, judul, isi, tag_id: newTag.id },
        });

        return artikel;
      }

      const artikel = await prisma.artikel.create({
        data: { thumbnail, judul, isi, tag_id: findTag.id },
      });

      return artikel;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const parse = url.parse(thumbnail);
        fs.exists(`uploads/${parse.pathname}`, (exist) => {
          if (exist) {
            fs.unlink(`uploads/${parse.pathname}`, (err) => {
              if (err) throw err;
            });
          }
        });
        return { status: false, code: error.code, meta: error.meta, message: error.message };
      }
      const parse = url.parse(thumbnail);
      fs.exists(`uploads/${parse.pathname}`, (exist) => {
        if (exist) {
          fs.unlink(`uploads/${parse.pathname}`, (err) => {
            if (err) throw err;
          });
        }
      });
      throw error;
    }
  },

  updateArtikel: async (id, data) => {
    const { thumbnail, judul, isi, tag } = data;

    const findArtikel = await prisma.artikel.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findArtikel) {
      return { status: false, message: `Artikel with id ${id} not exist!` };
    }

    const findTag = await getTagByName(tag);

    if (!findTag) {
      const newTag = await createTag(tag);
      const artikel = await prisma.artikel.update({
        data: {
          thumbnail: thumbnail || findArtikel.thumbnail,
          judul: judul || findArtikel.judul,
          isi: isi || findArtikel.isi,
          tag_id: newTag.id,
        },
        where: { id: parseInt(id, 10) },
      });
      const parse = url.parse(findArtikel.thumbnail);
      fs.exists(`uploads/${parse.pathname}`, (exist) => {
        if (exist) {
          fs.unlink(`uploads/${parse.pathname}`, (err) => {
            if (err) throw err;
          });
        }
      });

      return artikel;
    }

    const artikel = await prisma.artikel.update({
      where: { id: parseInt(id, 10) },
      data: {
        thumbnail: thumbnail || findArtikel.thumbnail,
        judul: judul || findArtikel.judul,
        isi: isi || findArtikel.isi,
        tag_id: findArtikel.tag_id,
      },
    });

    if (thumbnail === findArtikel.thumbnail) {
      return artikel;
    }

    const parse = url.parse(findArtikel.thumbnail);
    fs.exists(`uploads/${parse.pathname}`, (exist) => {
      if (exist) {
        fs.unlink(`uploads/${parse.pathname}`, (err) => {
          if (err) throw err;
        });
      }
    });

    return artikel;
  },

  deleteArtikel: async (id) => {
    const findArtikel = await prisma.artikel.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findArtikel) {
      return { status: false, message: `Artikel with id ${id} not exist!` };
    }

    const artikel = await prisma.artikel.delete({ where: { id: parseInt(id, 10) } });
    const parse = url.parse(findArtikel.thumbnail);
    fs.exists(`uploads/${parse.pathname}`, (exist) => {
      if (exist) {
        fs.unlink(`uploads/${parse.pathname}`, (err) => {
          if (err) throw err;
        });
      }
    });

    return artikel;
  },
};
