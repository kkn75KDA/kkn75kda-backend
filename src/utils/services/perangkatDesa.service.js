const prisma = require('../libs/prisma.config');
const perangkatDesaValidationSchema = require('../validations/perangkatDesa.schema');

module.exports = {
  getAllPerangkatDesa: async () => {
    const perangkatDesa = await prisma.$queryRaw`
    SELECT 
      pd.id, p."namaLengkap", 
      pd.photo, 
      j.nama as jabatan
    FROM "PerangkatDesa" pd 
    INNER JOIN "Penduduk" p ON pd.nik_id = p.nik 
    INNER JOIN "Jabatan" j ON pd.jabatan_id = j.id 
    `;

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
