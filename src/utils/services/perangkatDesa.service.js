/* eslint-disable camelcase */
const fs = require('fs');
const url = require('url');

const prisma = require('../libs/prisma.config');

module.exports = {
  getAllPerangkatDesa: async () => {
    const perangkatDesa = await prisma.perangkatDesa.findMany({ orderBy: { nama: 'asc' } });

    return perangkatDesa;
  },

  getPerangkatDesaById: async (id) => {
    const perangkatDesa = await prisma.perangkatDesa.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!perangkatDesa) {
      return { status: false, message: `Perangkat Desa with id ${id} not exist!` };
    }

    return perangkatDesa;
  },

  createPerangkatDesa: async (data) => {
    const { nama, photo, jabatan } = data;

    const perangkat = await prisma.perangkatDesa.create({ data: { nama, photo, jabatan } });

    return perangkat;
  },

  updatePerangkatDesa: async (id, data) => {
    const findPerangkat = await prisma.perangkatDesa.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!findPerangkat) {
      return { status: false, message: `Perangkat desa with id ${id} not exist!` };
    }

    const perangkat = await prisma.perangkatDesa.update({ where: { id: parseInt(id, 10) }, data });

    if (data.photo === findPerangkat.photo) {
      return perangkat;
    }
    const parse = url.parse(findPerangkat.photo);
    fs.exists(`uploads/${parse.pathname}`, (exist) => {
      if (exist) {
        fs.unlink(`uploads/${parse.pathname}`, (err) => {
          if (err) throw err;
        });
      }
    });

    return perangkat;
  },

  deletePerangkat: async (id) => {
    const findPerangkat = await prisma.perangkatDesa.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!findPerangkat) {
      return { status: false, message: `Perangkat desa with id ${id} not exist!` };
    }

    const perangkat = await prisma.perangkatDesa.delete({ where: { id: parseInt(id, 10) } });
    const parse = url.parse(findPerangkat.photo);
    fs.exists(`uploads/${parse.pathname}`, (exist) => {
      if (exist) {
        fs.unlink(`uploads/${parse.pathname}`, (err) => {
          if (err) throw err;
        });
      }
    });

    return perangkat;
  },
};
