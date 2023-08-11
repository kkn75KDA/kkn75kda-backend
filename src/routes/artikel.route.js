const router = require('express').Router();

const artikelController = require('../controllers/artikel.controller');
const multerMiddleware = require('../middlewares/multer.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', artikelController.getAll);
router.get('/:id', artikelController.getById);
router.post('/', authMiddleware, multerMiddleware.image.single('thumbnail'), artikelController.create);
router.put('/:id', authMiddleware, multerMiddleware.image.single('thumbnail'), artikelController.update);
router.delete('/:id', authMiddleware, artikelController.delete);

module.exports = router;
