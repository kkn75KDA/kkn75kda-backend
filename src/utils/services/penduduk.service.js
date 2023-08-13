/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
const fs = require('fs');
const url = require('url');
const csv = require('fast-csv');
const { Prisma } = require('@prisma/client');

const prisma = require('../libs/prisma.config');
const { getPedidikanByName, createPendidikan } = require('./pendidikan.service');
const { getPekerjaanByName, createPekerjaan } = require('./pekerjaan.service');

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
    Inner JOIN "Pendidikan" p2 ON p.pendidikan_id = p2.id 
    Inner JOIN "Pekerjaan" p3 ON p.pekerjaan_id = p3.id
    Inner JOIN "KartuKeluarga" kk ON p.no_kk_id = kk.no_kk 
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
    INNER JOIN "KartuKeluarga" kk ON p.no_kk_id = kk.no_kk
    WHERE
        kk.no_kk = ${noKK}
    `;

    if (resident.length === 0) {
      return { status: false, message: `Penduduk with No.KK ${noKK} doesn't exist!` };
    }

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
      pendidikan,
      pekerjaan,
      status,
      no_kk,
      dusun,
      rt,
      rw,
      no_hp,
    } = data;

    const findPendidikan = await getPedidikanByName(pendidikan);
    const findPekerjaan = await getPekerjaanByName(pekerjaan);

    if (!findPendidikan && !findPekerjaan) {
      const newPendidikan = await createPendidikan(pekerjaan);
      const newPekerjaan = await createPekerjaan(pekerjaan);

      const kk = await prisma.kartuKeluarga.create({ data: { no_kk, dusun, rt, rw } });

      const penduduk = await prisma.penduduk.create({
        data: {
          no_kk_id: no_kk,
          namaLengkap,
          nik,
          gender,
          tempat_lahir,
          tanggal_lahir,
          agama,
          pendidikan_id: newPendidikan.id,
          pekerjaan_id: newPekerjaan.id,
          status,
          no_hp,
        },
      });

      return { penduduk, kk };
    }

    if (!findPendidikan) {
      const newPendidikan = await createPendidikan(pekerjaan);

      const kk = await prisma.kartuKeluarga.create({ data: { no_kk, dusun, rt, rw } });

      const penduduk = await prisma.penduduk.create({
        data: {
          no_kk_id: no_kk,
          namaLengkap,
          nik,
          gender,
          tempat_lahir,
          tanggal_lahir,
          agama,
          pendidikan_id: newPendidikan.id,
          pekerjaan_id: findPekerjaan.id,
          status,
          no_hp,
        },
      });

      return { penduduk, kk };
    }

    if (!findPekerjaan) {
      const newPekerjaan = await createPekerjaan(pekerjaan);

      const kk = await prisma.kartuKeluarga.create({ data: { no_kk, dusun, rt, rw } });

      const penduduk = await prisma.penduduk.create({
        data: {
          no_kk_id: no_kk,
          namaLengkap,
          nik,
          gender,
          tempat_lahir,
          tanggal_lahir,
          agama,
          pendidikan_id: findPendidikan.id,
          pekerjaan_id: newPekerjaan.id,
          status,
          no_hp,
        },
      });

      return { penduduk, kk };
    }

    const kk = await prisma.kartuKeluarga.create({ data: { no_kk, dusun, rt, rw } });

    const penduduk = await prisma.penduduk.create({
      data: {
        no_kk_id: no_kk,
        namaLengkap,
        nik,
        gender,
        tempat_lahir,
        tanggal_lahir,
        agama,
        pendidikan_id: findPendidikan.id,
        pekerjaan_id: findPekerjaan.id,
        status,
        no_hp,
      },
    });

    return { penduduk, kk };
  },

  updatePenduduk: async (id, data) => {
    const {
      namaLengkap,
      nik,
      gender,
      tempat_lahir,
      tanggal_lahir,
      agama,
      pendidikan,
      pekerjaan,
      status,
      no_kk,
      dusun,
      rt,
      rw,
      no_hp,
    } = data;

    const findPenduduk = await prisma.penduduk.findUnique({ where: { nik: id } });

    if (!findPenduduk) {
      return {
        status: false,
        message: `Penduduk with NIK ${id} not exist!`,
      };
    }

    const findKK = await prisma.kartuKeluarga.findUnique({
      where: { no_kk: findPenduduk.no_kk_id },
    });

    if (!findKK) {
      return { status: false, message: `Kartu Keluarga with no.KK ${findPenduduk.no_kk_id}` };
    }

    const findPendidikan = await getPedidikanByName(pendidikan);
    const findPekerjaan = await getPekerjaanByName(pekerjaan);

    if (!findPendidikan && !findPekerjaan) {
      const newPendidikan = await createPendidikan(pendidikan);
      const newPekerjaan = await createPekerjaan(pekerjaan);

      const penduduk = await prisma.penduduk.update({
        where: { nik: id },
        data: {
          no_kk_id: no_kk || findPenduduk.no_kk_id,
          namaLengkap: namaLengkap || findPenduduk.namaLengkap,
          nik: nik || findPenduduk.nik,
          gender: gender || findPenduduk.gender,
          tempat_lahir: tempat_lahir || findPenduduk.tempat_lahir,
          tanggal_lahir: tanggal_lahir || findPenduduk.tanggal_lahir,
          agama: agama || findPenduduk.agama,
          pekerjaan_id: newPekerjaan.id || findPenduduk.pekerjaan_id,
          pendidikan_id: newPendidikan.id || findPenduduk.pendidikan_id,
          status: status || findPenduduk.status,
          no_hp: no_hp || findPenduduk.no_hp,
        },
      });

      const kk = await prisma.kartuKeluarga.update({
        where: { no_kk: findPenduduk.no_kk_id },
        data: {
          no_kk: no_kk || findKK.no_kk,
          dusun: dusun || findKK.dusun,
          rt: rt || findKK.rt,
          rw: rw || findKK.rw,
        },
      });

      return [penduduk, kk];
    }

    if (!findPekerjaan) {
      const newPekerjaan = await createPekerjaan(pekerjaan);

      const penduduk = await prisma.penduduk.update({
        where: { nik: id },
        data: {
          no_kk_id: no_kk || findPenduduk.no_kk_id,
          namaLengkap: namaLengkap || findPenduduk.namaLengkap,
          nik: nik || findPenduduk.nik,
          gender: gender || findPenduduk.gender,
          tempat_lahir: tempat_lahir || findPenduduk.tempat_lahir,
          tanggal_lahir: tanggal_lahir || findPenduduk.tanggal_lahir,
          agama: agama || findPenduduk.agama,
          pekerjaan_id: newPekerjaan.id || findPenduduk.pekerjaan_id,
          pendidikan_id: findPendidikan.id || findPenduduk.pendidikan_id,
          status: status || findPenduduk.status,
          no_hp: no_hp || findPenduduk.no_hp,
        },
      });

      const kk = await prisma.kartuKeluarga.update({
        where: { no_kk: findPenduduk.no_kk_id },
        data: {
          no_kk: no_kk || findKK.no_kk,
          dusun: dusun || findKK.dusun,
          rt: rt || findKK.rt,
          rw: rw || findKK.rw,
        },
      });

      return [penduduk, kk];
    }

    if (!findPendidikan) {
      const newPendidikan = await createPendidikan(pendidikan);

      const penduduk = await prisma.penduduk.update({
        where: { nik: id },
        data: {
          no_kk_id: no_kk || findPenduduk.no_kk_id,
          namaLengkap: namaLengkap || findPenduduk.namaLengkap,
          nik: nik || findPenduduk.nik,
          gender: gender || findPenduduk.gender,
          tempat_lahir: tempat_lahir || findPenduduk.tempat_lahir,
          tanggal_lahir: tanggal_lahir || findPenduduk.tanggal_lahir,
          agama: agama || findPenduduk.agama,
          pekerjaan_id: findPekerjaan.id || findPenduduk.pekerjaan_id,
          pendidikan_id: newPendidikan.id || findPenduduk.pendidikan_id,
          status: status || findPenduduk.status,
          no_hp: no_hp || findPenduduk.no_hp,
        },
      });

      const kk = await prisma.kartuKeluarga.update({
        where: { no_kk: findPenduduk.no_kk_id },
        data: {
          no_kk: no_kk || findKK.no_kk,
          dusun: dusun || findKK.dusun,
          rt: rt || findKK.rt,
          rw: rw || findKK.rw,
        },
      });

      return [penduduk, kk];
    }

    const penduduk = await prisma.penduduk.update({
      where: { nik: id },
      data: {
        no_kk_id: no_kk || findPenduduk.no_kk_id,
        namaLengkap: namaLengkap || findPenduduk.namaLengkap,
        nik: nik || findPenduduk.nik,
        gender: gender || findPenduduk.gender,
        tempat_lahir: tempat_lahir || findPenduduk.tempat_lahir,
        tanggal_lahir: tanggal_lahir || findPenduduk.tanggal_lahir,
        agama: agama || findPenduduk.agama,
        pekerjaan_id: findPekerjaan.id || findPenduduk.pekerjaan_id,
        pendidikan_id: findPendidikan.id || findPenduduk.pendidikan_id,
        status: status || findPenduduk.status,
        no_hp: no_hp || findPenduduk.no_hp,
      },
    });

    const kk = await prisma.kartuKeluarga.update({
      where: { no_kk: findPenduduk.no_kk_id },
      data: {
        no_kk: no_kk || findKK.no_kk,
        dusun: dusun || findKK.dusun,
        rt: rt || findKK.rt,
        rw: rw || findKK.rw,
      },
    });

    return [penduduk, kk];
  },

  deletePenduduk: async (id) => {
    const findPenduduk = await prisma.penduduk.findUnique({ where: { nik: id } });

    if (!findPenduduk) {
      return { status: false, message: `Penduduk with NIK ${id} not exist!` };
    }

    const penduduk = await prisma.penduduk.delete({ where: { nik: id } });

    return penduduk;
  },

  importPenduduk: async (csvUrl) => {
    const stream = fs.createReadStream(csvUrl);

    csv
      .parseStream(stream, { headers: true, delimiter: ',' })
      .on('error', (err) => {
        throw err;
      })
      .on('data', async (data) => {
        try {
          const {
            namaLengkap,
            nik,
            gender,
            tempat_lahir,
            tanggal_lahir,
            agama,
            pendidikan,
            pekerjaan,
            status,
            no_hp,
            no_kk,
            dusun,
            rt,
            rw,
          } = data;

          const findPendidikan = await getPedidikanByName(pendidikan);
          const findPekerjaan = await getPekerjaanByName(pekerjaan);

          if (!findPendidikan && !findPekerjaan) {
            const newPendidikan = await createPendidikan(pendidikan);

            const newPekerjaan = await createPekerjaan(pekerjaan);

            const dataKK = await prisma.kartuKeluarga.createMany({
              data: { no_kk, dusun, rt, rw },
              skipDuplicates: true,
            });

            const dataPenduduk = await prisma.penduduk.createMany({
              data: {
                no_kk_id: no_kk,
                namaLengkap,
                nik,
                gender,
                tempat_lahir,
                tanggal_lahir,
                agama,
                pendidikan_id: newPendidikan.id,
                pekerjaan_id: newPekerjaan.id,
                status,
                no_hp,
              },
              skipDuplicates: true,
            });

            return [dataPenduduk, dataKK];
          }

          if (!findPendidikan) {
            const newPendidikan = await createPendidikan(pendidikan);

            const dataKK = await prisma.kartuKeluarga.createMany({
              data: { no_kk, dusun, rt, rw },
              skipDuplicates: true,
            });

            const dataPenduduk = await prisma.penduduk.createMany({
              data: {
                no_kk_id: no_kk,
                namaLengkap,
                nik,
                gender,
                tempat_lahir,
                tanggal_lahir,
                agama,
                pendidikan_id: newPendidikan.id,
                pekerjaan_id: findPekerjaan.id,
                status,
                no_hp,
              },
              skipDuplicates: true,
            });

            return { dataPenduduk, dataKK };
          }

          if (!findPekerjaan) {
            const newPekerjaan = await createPekerjaan(pekerjaan);

            const dataKK = await prisma.kartuKeluarga.createMany({
              data: { no_kk, dusun, rt, rw },
              skipDuplicates: true,
            });

            const dataPenduduk = await prisma.penduduk.createMany({
              data: {
                no_kk_id: no_kk,
                namaLengkap,
                nik,
                gender,
                tempat_lahir,
                tanggal_lahir,
                agama,
                pendidikan_id: findPendidikan.id,
                pekerjaan_id: newPekerjaan.id,
                status,
                no_hp,
              },
              skipDuplicates: true,
            });

            return { dataPenduduk, dataKK };
          }

          const dataKK = await prisma.kartuKeluarga.createMany({
            data: { no_kk, dusun, rt, rw },
            skipDuplicates: true,
          });

          const dataPenduduk = await prisma.penduduk.createMany({
            data: {
              no_kk_id: no_kk,
              namaLengkap,
              nik,
              gender,
              tempat_lahir,
              tanggal_lahir,
              agama,
              pendidikan_id: findPendidikan.id,
              pekerjaan_id: findPekerjaan.id,
              status,
              no_hp,
            },
            skipDuplicates: true,
          });

          return { dataPenduduk, dataKK };
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            const parse = url.parse(csvUrl);
            fs.unlink(`uploads/${parse.pathname}`, (err) => {
              if (err) throw err;
            });
            return { status: false, code: error.code, meta: error.meta, message: error.message };
          }
          const parse = url.parse(csvUrl);
          fs.unlink(`uploads/${parse.pathname}`, (err) => {
            if (err) throw err;
          });
          throw error;
        }
      })
      .on('end', () => {
        fs.unlink(csvUrl, (err) => {
          if (err) throw err;
        });
      });
  },
};
