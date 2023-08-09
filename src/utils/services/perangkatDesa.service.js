/* eslint-disable camelcase */
const fs = require('fs');
const url = require('url');

const prisma = require('../libs/prisma.config');

module.exports = {
  getAllPerangkatDesa: async () => {
    const perangkatDesa = await prisma.$queryRaw`
    SELECT
      pd.id,
      p."namaLengkap",
      pd.photo,
      pd.jabatan 
    FROM "PerangkatDesa" pd 
    INNER JOIN "Penduduk" p ON pd.nik_id = p.nik 
    `;

    return perangkatDesa;
  },

  createPerangkatDesa: async (data) => {
    const { nik_id, photo, jabatan } = data;

    const perangkat = await prisma.perangkatDesa.create({ data: { nik_id, photo, jabatan } });

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
    const parse = url.parse(findPerangkat.photo);
    fs.unlink(`uploads/${parse.pathname}`, (err) => {
      if (err) throw err;
    });

    return perangkat;
  },

  deletePerangkat: async (id) => {
    const findPerangkat = await prisma.perangkatDesa.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!findPerangkat) {
      return { status: false, message: `Perangkat desa with d ${id} not exist!` };
    }

    const perangkat = await prisma.perangkatDesa.delete({ where: { id: parseInt(id, 10) } });
    const parse = url.parse(findPerangkat.photo);
    fs.unlink(`uploads/${parse.pathname}`, (err) => {
      if (err) throw err;
    });

    return perangkat;
  },
};
