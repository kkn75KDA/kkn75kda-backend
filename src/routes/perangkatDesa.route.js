const router = require('express').Router();

const perangkatDesaController = require('../controllers/perangkatDesa.controller');
const multerMiddleware = require('../middlewares/multer.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', perangkatDesaController.getAll);
router.post('/', authMiddleware, multerMiddleware.image.single('photo'), perangkatDesaController.create);
router.put('/:id', authMiddleware, multerMiddleware.image.single('photo'), perangkatDesaController.update);
router.delete('/:id', authMiddleware, perangkatDesaController.delete);

module.exports = router;
