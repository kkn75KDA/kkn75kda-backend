/* eslint-disable operator-linebreak */
const multer = require('multer');
const storage = require('../utils/libs/storage.lib');

module.exports = {
  image: multer({
    storage,
    limits: 1000000,
    fileFilter: (req, file, callback) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        callback(null, true);
      } else {
        const err = new Error('only png, jpg, and jpeg allowed to upload!');
        callback(err, false);
      }
    },

    onError: (err) => {
      throw err;
    },
  }),
};
