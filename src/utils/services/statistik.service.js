const prisma = require('../libs/prisma.config');

module.exports = {
  statAge: async () => {
    const age = await prisma.$queryRaw`
    SELECT
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE EXTRACT(YEAR FROM AGE(NOW(), (p.tanggal_lahir)::DATE)) BETWEEN 0 AND 5) AS umur_0_5_tahun,
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE EXTRACT(YEAR FROM AGE(NOW(), (p.tanggal_lahir)::DATE)) BETWEEN 5 AND 11) AS umur_5_11_tahun,
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE EXTRACT(YEAR FROM AGE(NOW(), (p.tanggal_lahir)::DATE)) BETWEEN 12 AND 16) AS umur_12_16_tahun,
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE EXTRACT(YEAR FROM AGE(NOW(), (p.tanggal_lahir)::DATE)) BETWEEN 17 AND 25) AS umur_17_25_tahun,
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE EXTRACT(YEAR FROM AGE(NOW(), (p.tanggal_lahir)::DATE)) BETWEEN 26 AND 35) AS umur_26_35_tahun,
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE EXTRACT(YEAR FROM AGE(NOW(), (p.tanggal_lahir)::DATE)) BETWEEN 36 AND 45) AS umur_36_45_tahun,
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE EXTRACT(YEAR FROM AGE(NOW(), (p.tanggal_lahir)::DATE)) BETWEEN 46 AND 55) AS umur_46_55_tahun,
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE EXTRACT(YEAR FROM AGE(NOW(), (p.tanggal_lahir)::DATE)) BETWEEN 56 AND 65) AS umur_56_65_tahun,
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE EXTRACT(YEAR FROM AGE(NOW(), (p.tanggal_lahir)::DATE)) BETWEEN 65 AND 300) AS umur_65_tahun_keatas;
    `;

    return age;
  },

  statEducation: async () => {
    const education = await prisma.$queryRaw`
    SELECT
        (SELECT COUNT(*)::integer FROM  "Penduduk" p INNER JOIN "Pendidikan" p2 ON p.pendidikan_id = p2.id WHERE p2.nama = 'Tidak Sekolah') AS tidak_sekolah,
        (SELECT COUNT(*)::integer FROM  "Penduduk" p INNER JOIN "Pendidikan" p2 ON p.pendidikan_id = p2.id WHERE p2.nama = 'PAUD') AS paud,
        (SELECT COUNT(*)::integer FROM  "Penduduk" p INNER JOIN "Pendidikan" p2 ON p.pendidikan_id = p2.id WHERE p2.nama = 'TK') AS tk,
        (SELECT COUNT(*)::integer FROM  "Penduduk" p INNER JOIN "Pendidikan" p2 ON p.pendidikan_id = p2.id WHERE p2.nama = 'SD/MI') AS sd_mi,
        (SELECT COUNT(*)::integer FROM  "Penduduk" p INNER JOIN "Pendidikan" p2 ON p.pendidikan_id = p2.id WHERE p2.nama = 'SMP/MTS') AS smp_mts,
        (SELECT COUNT(*)::integer FROM  "Penduduk" p INNER JOIN "Pendidikan" p2 ON p.pendidikan_id = p2.id WHERE p2.nama = 'SMA/MA/SMK') AS sma_ma_smk,
        (SELECT COUNT(*)::integer FROM  "Penduduk" p INNER JOIN "Pendidikan" p2 ON p.pendidikan_id = p2.id WHERE p2.nama = 'Perguruan Tinggi') AS perguruan_tinggi;
    `;

    return education;
  },

  statGender: async () => {
    const gender = await prisma.$queryRaw`
    SELECT 
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE p.gender = 'L') as l,
        (SELECT COUNT(*)::integer FROM "Penduduk" p WHERE p.gender = 'P') as p;
    `;

    return gender;
  },

  statPekerjaan: async () => {
    const jobList = await prisma.pekerjaan.findMany();
    let query = 'SELECT ';
    let nested = '';

    jobList.forEach((job) => {
      nested += `(SELECT COUNT(*)::integer FROM "Penduduk" p INNER JOIN "Pekerjaan" p2 ON p.pekerjaan_id = p2.id WHERE p2.nama = '${
        job.nama
      }') AS ${job.nama.toLowerCase().replace(' ', '_')},`;
    });

    let newQuery = nested.slice(0, nested.length - 1);
    newQuery += ';';
    query += newQuery;

    const jobs = await prisma.$queryRawUnsafe(query);

    return jobs;
  },
};
