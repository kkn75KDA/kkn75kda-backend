const prisma = require('../libs/prisma.config');
const perangkatDesaValidationSchema = require('../validations/perangkatDesa.schema');

module.exports = {
  getAllPerangkatDesa: async () => {
    const perangkatDesa = await prisma.perangkatDesa.findMany({
      select: {
        id: true,
        nik: {
          select: {
            nik: true,
            nama: true,
          },
        },
        photo: true,
        jabatan: {
          select: {
            nama: true,
          },
        },
      },
    });

    return perangkatDesa;
  },

  updatePerangkatDesa: async (perangkat, nik) => {
    const { error, value } = await perangkatDesaValidationSchema.validate(perangkat);

    if (error) {
      return {
        status: false,
        message: error.details[0].message,
      };
    }

    const update = await prisma.perangkatDesa.update({ data: value, where: nik });

    return update;
  },
};
