const router = require('express').Router();

const dataAssetController = require('../controllers/dataAsset.controller');
const multerMiddleware = require('../middlewares/multer.middleware');

router.get('/', dataAssetController.getAll);
router.get('/:id', dataAssetController.getByKK);
router.post('/', dataAssetController.create);
router.put('/:id', dataAssetController.update);
router.delete('/:id', dataAssetController.delete);
router.post('/import', multerMiddleware.csv.single('file_data_asset'), dataAssetController.importCsv);

module.exports = router;
