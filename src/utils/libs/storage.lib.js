const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/images');
  },

  filename: (req, file, callback) => {
    const fileName = Date.now() + path.extname(file.originalname);
    callback(null, fileName);
  },
});

module.exports = storage;
