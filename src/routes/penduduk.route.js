const router = require('express').Router();

const pendudukController = require('../controllers/penduduk.controller');
const multerMiddleware = require('../middlewares/multer.middleware');

router.get('/', pendudukController.getAll);
router.get('/:noKK', pendudukController.getByKK);
router.post('/', pendudukController.create);
router.post('/import', multerMiddleware.csv.single('file_penduduk'), pendudukController.importCsv);

module.exports = router;
