/* eslint-disable camelcase */
const prisma = require('../libs/prisma.config');

module.exports = {
  getAllPenduduk: async () => {
    const residents = await prisma.$queryRaw`
    SELECT
        p."namaLengkap",
        p.nik,
        p.gender,
        p.tempat_lahir,
        p.tanggal_lahir,
        p.agama,
        p2.nama AS pendidikan,
        p3.nama AS pekerjaan,
        p.status,
        kk.no_kk,
        kk.dusun,
        kk.rt,
        kk.rw
    FROM "Penduduk" p 
    INNER JOIN "Pendidikan" p2 ON p.pendidikan_id = p2.id 
    INNER JOIN "Pekerjaan" p3 ON p.pekerjaan_id = p3.id
    INNER JOIN "KartuKeluarga" kk ON p.nik = kk.nik_id 
    `;

    return residents;
  },

  getPendudukByKK: async (noKK) => {
    const resident = await prisma.$queryRaw`
    SELECT
            p."namaLengkap",
            p.nik,
            p.gender,
            p.tempat_lahir,
            p.tanggal_lahir,
            p.agama,
            p2.nama AS pendidikan,
            p3.nama AS pekerjaan,
            p.status,
            kk.no_kk,
            kk.dusun,
            kk.rt,
            kk.rw
    FROM "Penduduk" p 
    INNER JOIN "Pendidikan" p2 ON p.pendidikan_id = p2.id 
    INNER JOIN "Pekerjaan" p3 ON p.pekerjaan_id = p3.id
    INNER JOIN "KartuKeluarga" kk ON p.nik = kk.nik_id 
    WHERE
        kk.no_kk = ${noKK}
    `;

    return resident;
  },

  createPenduduk: async (data) => {
    const {
      namaLengkap,
      nik,
      gender,
      tempat_lahir,
      tanggal_lahir,
      agama,
      pendidikan_id,
      pekerjaan_id,
      status,
      no_kk,
      dusun,
      rt,
      rw,
    } = data;

    const penduduk = await prisma.penduduk.create({
      data: {
        namaLengkap,
        nik,
        gender,
        tempat_lahir,
        tanggal_lahir,
        agama,
        pendidikan_id,
        pekerjaan_id,
        status,
        no_kk,
        dusun,
        rt,
        rw,
      },
    });

    const kk = await prisma.kartuKeluarga.create({
      data: {
        no_kk,
        dusun,
        rt,
        rw,
      },
    });

    return { penduduk, kk };
  },
};
