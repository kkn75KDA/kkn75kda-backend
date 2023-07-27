/* eslint-disable no-case-declarations */
const {
  statAge,
  statPekerjaan,
  statEducation,
  statGender,
} = require('../utils/services/statistik.service');

module.exports = {
  statistik: async (req, res, next) => {
    try {
      const { type } = req.params;

      switch (type) {
        case 'umur':
          const ages = await statAge();

          return res.status(200).json({
            status: true,
            message: 'success',
            data: { ages },
          });

        case 'pendidikan':
          const educations = await statEducation();

          return res.status(200).json({
            status: true,
            message: 'success',
            data: { educations },
          });

        case 'gender':
          const genders = await statGender();

          return res.status(200).json({
            status: true,
            message: 'success',
            data: { genders },
          });
        case 'pekerjaan':
          const jobs = await statPekerjaan();

          return res.status(200).json({
            status: true,
            message: 'success',
            data: { jobs },
          });
        default:
          next();
      }
    } catch (error) {
      next(error);
    }
    return null;
  },
};
