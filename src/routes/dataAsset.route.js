const router = require('express').Router();

const dataAssetController = require('../controllers/dataAsset.controller');
const multerMiddleware = require('../middlewares/multer.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, dataAssetController.getAll);
router.get('/:id', authMiddleware, dataAssetController.getByKK);
router.post('/', authMiddleware, dataAssetController.create);
router.put('/:id', authMiddleware, dataAssetController.update);
router.delete('/:id', authMiddleware, dataAssetController.delete);
router.post('/import', authMiddleware, multerMiddleware.csv.single('file_data_asset'), dataAssetController.importCsv);

module.exports = router;
