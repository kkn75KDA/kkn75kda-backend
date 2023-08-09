/* eslint-disable camelcase */
/* eslint-disable no-useless-catch */
const fs = require('fs');
const csv = require('fast-csv');
const url = require('url');
const { Prisma } = require('@prisma/client');

const prisma = require('../libs/prisma.config');

const { getAssetByName, createAsset } = require('./asset.service');
const { importDataAssetSchema } = require('../validations/dataAsset.schema');

module.exports = {
  getAllDataAsset: async () => {
    const assets = await prisma.dataAsset.findMany({
      include: { asset: { select: { nama: true } } },
    });

    return assets;
  },

  getDataAssetByKK: async (no_kk) => {
    const asset = await prisma.dataAsset.findMany({
      select: {
        no_kk_id: true,
        jumlah: true,
        asset: {
          select: {
            nama: true,
          },
        },
        penghasilan: true,
      },
      where: { no_kk_id: no_kk },
    });

    if (!asset) {
      return {
        status: false,
        message: `Asset data ${no_kk} not exist!`,
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

    const findDataAsset = await prisma.dataAsset.findUnique({ where: { no_kk_id: id } });
    const findAsset = await prisma.asset.findUnique({ where: { nama: asset } });

    if (!findDataAsset) {
      return {
        status: false,
        message: `Asset data with no.KK ${id} not exist!`,
      };
    }

    if (!asset) {
      const newAsset = await prisma.asset.create({ data: { nama: asset } });

      const dataAsset = await prisma.dataAsset.update({
        where: { no_kk_id: id },
        data: {
          no_kk_id: findDataAsset.no_kk_id,
          asset_id: newAsset.id,
          jumlah: jumlah || findDataAsset.jumlah,
          penghasilan: penghasilan || findDataAsset.penghasilan,
        },
      });

      return dataAsset;
    }

    const dataAsset = await prisma.dataAsset.update({
      where: { no_kk_id: id },
      data: {
        no_kk_id: findDataAsset.no_kk_id,
        asset_id: findAsset.id,
        jumlah: jumlah || findDataAsset.jumlah,
        penghasilan: penghasilan || findDataAsset.penghasilan,
      },
    });

    return dataAsset;
  },

  deleteDataAsset: async (id) => {
    const findDataAsset = await prisma.dataAsset.findUnique({ where: { id } });

    if (!findDataAsset) {
      return {
        status: false,
        message: `Asset data with id ${id} not exist!`,
      };
    }

    const dataAsset = await prisma.dataAsset.delete({ where: { no_kk_id: id } });

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
          const { error, value } = importDataAssetSchema.validate(data);

          if (error) {
            return { status: false, message: error.details[0].message };
          }

          const { no_kk, asset, jumlah, penghasilan } = value;

          const findAsset = await getAssetByName(asset);

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
