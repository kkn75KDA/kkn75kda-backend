/* eslint-disable camelcase */
/* eslint-disable no-useless-catch */
const fs = require('fs');
const csv = require('fast-csv');
const { Prisma } = require('@prisma/client');

const prisma = require('../libs/prisma.config');

const { getAssetByName, createAsset } = require('./asset.service');

module.exports = {
  getAllDataAsset: async () => {
    const assets = await prisma.dataAsset.findMany({
      include: { asset: { select: { nama: true } } },
      orderBy: { no_kk_id: 'asc' },
    });

    return assets;
  },

  getDataAssetById: async (id) => {
    const asset = await prisma.dataAsset.findMany({
      select: {
        id: true,
        no_kk_id: true,
        jumlah: true,
        asset: {
          select: {
            nama: true,
          },
        },
        penghasilan: true,
      },
      where: { id: parseInt(id, 10) },
    });

    if (!asset) {
      return {
        status: false,
        message: `Asset data ${id} not exist!`,
      };
    }

    return asset;
  },

  createDataAsset: async (data) => {
    const { no_kk, asset, jumlah, penghasilan } = data;

    const findAsset = await prisma.asset.findFirst({ where: { nama: asset } });

    if (!findAsset) {
      const newAsset = await prisma.asset.create({ data: { nama: asset } });

      const dataAsset = await prisma.dataAsset.create({
        data: { no_kk_id: no_kk, asset_id: newAsset.id, jumlah, penghasilan },
      });

      return dataAsset;
    }

    const dataAsset = await prisma.dataAsset.create({
      data: { no_kk_id: no_kk, asset_id: findAsset.id, jumlah, penghasilan },
    });

    return dataAsset;
  },

  updateDataAsset: async (id, data) => {
    const { asset, jumlah, penghasilan } = data;

    const findDataAsset = await prisma.dataAsset.findFirst({ where: { id: parseInt(id, 10) } });
    const findAsset = await prisma.asset.findFirst({ where: { nama: asset } });

    if (!findDataAsset) {
      return { status: false, message: `Asset data with id ${id} not exist!` };
    }

    if (findDataAsset.penghasilan !== penghasilan) {
      await prisma.dataAsset.updateMany({
        where: { no_kk_id: findDataAsset.no_kk_id },
        data: { penghasilan },
      });

      if (!findAsset) {
        const newAsset = await prisma.asset.create({ data: { nama: asset } });

        const dataAsset = await prisma.dataAsset.update({
          where: { id: parseInt(id, 10) },
          data: {
            no_kk_id: findDataAsset.no_kk_id,
            asset_id: newAsset.id,
            jumlah: jumlah || findDataAsset.jumlah,
          },
        });

        return dataAsset;
      }

      const dataAsset = await prisma.dataAsset.update({
        where: { id: parseInt(id, 10) },
        data: {
          no_kk_id: findDataAsset.no_kk_id,
          asset_id: findAsset.id,
          jumlah: jumlah || findDataAsset.jumlah,
          penghasilan: penghasilan || findDataAsset.penghasilan,
        },
      });

      return dataAsset;
    }

    if (!findAsset) {
      const newAsset = await prisma.asset.create({ data: { nama: asset } });

      const dataAsset = await prisma.dataAsset.update({
        where: { id: parseInt(id, 10) },
        data: {
          no_kk_id: findDataAsset.no_kk_id,
          asset_id: newAsset.id,
          jumlah: jumlah || findDataAsset.jumlah,
          penghasilan: findDataAsset.penghasilan,
        },
      });

      return dataAsset;
    }

    const dataAsset = await prisma.dataAsset.update({
      where: { id: parseInt(id, 10) },
      data: {
        no_kk_id: findDataAsset.no_kk_id,
        asset_id: findAsset.id,
        jumlah: jumlah || findDataAsset.jumlah,
        penghasilan: findDataAsset.penghasilan,
      },
    });

    return dataAsset;
  },

  deleteDataAsset: async (id) => {
    const findDataAsset = await prisma.dataAsset.findUnique({ where: { id: parseInt(id, 10) } });

    if (!findDataAsset) {
      return { status: false, message: `Asset data with id ${id} not exist!` };
    }

    const dataAsset = await prisma.dataAsset.delete({ where: { id: parseInt(id, 10) } });

    return dataAsset;
  },

  importCsv: async (csvUrl) => {
    const stream = fs.createReadStream(csvUrl);

    csv
      .parseStream(stream, { headers: true, delimiter: ',' })
      .on('error', (err) => {
        throw err;
      })
      .on('data', async (data) => {
        try {
          const { no_kk, asset, jumlah, penghasilan } = data;

          const findAsset = await getAssetByName(asset);

          if (asset === '') {
            const findAssetNull = await getAssetByName('-');
            const dataAsset = await prisma.dataAsset.createMany({
              data: {
                no_kk_id: no_kk,
                asset_id: findAssetNull.id,
                jumlah: '-',
                penghasilan,
              },
              skipDuplicates: true,
            });

            return dataAsset;
          }

          if (!findAsset) {
            const newAsset = await createAsset(asset);

            const dataAsset = await prisma.dataAsset.createMany({
              data: { no_kk_id: no_kk, asset_id: newAsset.id, jumlah, penghasilan },
              skipDuplicates: true,
            });

            return dataAsset;
          }

          const dataAsset = await prisma.dataAsset.createMany({
            data: {
              no_kk_id: no_kk,
              asset_id: findAsset.id,
              jumlah,
              penghasilan,
            },
            skipDuplicates: true,
          });

          return dataAsset;
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            fs.unlink(csvUrl, (err) => {
              if (err) throw err;
            });
            return { status: false, code: error.code, meta: error.meta, message: error.message };
          }
          fs.unlink(csvUrl, (err) => {
            if (err) throw err;
          });
          throw error;
        }
      })
      .on('end', () => {
        fs.exists(csvUrl, (exist) => {
          if (exist) {
            fs.unlink(csvUrl, (err) => {
              if (err) throw err;
            });
          }
        });
      });
  },
};
