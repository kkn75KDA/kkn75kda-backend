const prisma = require('../libs/prisma.config');

const pekerjaanValidationSchema = require('../validations/pekerjaan.schema');

module.exports = {
  createPekerjaan: async (pekerjaan) => {
    const { error, value } = await pekerjaanValidationSchema.validate(pekerjaan);

    if (error) {
      return {
        status: false,
        message: error.details[0].message,
      };
    }
    const addPekerjaan = prisma.pekerjaan.create({ data: value });

    return addPekerjaan;
  },
};
