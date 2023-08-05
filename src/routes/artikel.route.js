const router = require('express').Router();

const artikelController = require('../controllers/artikel.controller');
const multerMiddleware = require('../middlewares/multer.middleware');

router.get('/', artikelController.getAll);
router.get('/:id', artikelController.getById);
router.post('/', multerMiddleware.image.single('thumbnail'), artikelController.create);
router.put('/:id', multerMiddleware.image.single('thumbnail'), artikelController.update);
router.delete('/:id', artikelController.delete);

module.exports = router;
