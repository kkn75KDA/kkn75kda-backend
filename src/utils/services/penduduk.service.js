/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

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
      no_hp,
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
        no_hp,
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

  importPenduduk: async (csvUrl) => {
    const stream = fs.createReadStream(csvUrl);
    const dataPenduduk = [];

    csv
      .parseStream(stream, { headers: true, delimiter: ',' })
      .on('error', (err) => {
        throw err;
      })
      .on('data', async (data) => {
        try {
          const findPendidikan = await prisma.$queryRaw`
          SELECT *
          FROM "Pendidikan" p
          WHERE p.nama = ${data.pendidikan}
          `;

          const findPekerjaan = await prisma.$queryRaw`
          SELECT *
          FROM "Pekerjaan" p
          WHERE p.nama = ${data.pekerjaan}
          `;

          if (!findPendidikan) {
            const pendidikan = await prisma.pendidikan.create({ data: { nama: data.pendidikan } });
            if (!findPekerjaan) {
              const pekerjaan = await prisma.pekerjaan.create({ data: { nama: data.pekerjaan } });
            }
          }

          if (!findPekerjaan) {
            const pekerjaan = await prisma.pekerjaan.create({ data: { nama: data.pekerjaan } });
          }

          await prisma.penduduk.createMany({
            data: {
              namaLengkap: data.namaLengkap,
              nik: data.nik,
              gender: data.gender,
              tempat_lahir: data.tempat_lahir,
              tanggal_lahir: data.tanggal_lahir,
              agama: data.agama,
              pendidikan_id: findPendidikan.id,
              pekerjaan_id: data.pekerjaan_id,
              no_hp: data.no_hp,
            },
          });
        } catch (error) {
          throw error;
        }
      })
      .on('end', () => {
        console.log(dataPenduduk);
      });
    // fs.unlink(csvUrl, (err) => {
    //   if (err) throw err;
    // });
  },
};
