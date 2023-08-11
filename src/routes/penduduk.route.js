const router = require('express').Router();

const pendudukController = require('../controllers/penduduk.controller');
const multerMiddleware = require('../middlewares/multer.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, pendudukController.getAll);
router.get('/:noKK', authMiddleware, pendudukController.getByKK);
router.post('/', authMiddleware, pendudukController.create);
router.post('/import', authMiddleware, multerMiddleware.csv.single('file_penduduk'), pendudukController.importCsv);
router.put('/:id', authMiddleware, pendudukController.update);
router.delete('/:id', authMiddleware, pendudukController.delete);

module.exports = router;
