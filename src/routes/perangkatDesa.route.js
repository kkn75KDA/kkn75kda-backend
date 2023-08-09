const router = require('express').Router();

const perangkatDesaController = require('../controllers/perangkatDesa.controller');
const multerMiddleware = require('../middlewares/multer.middleware');

router.get('/', perangkatDesaController.getAll);
router.post('/', multerMiddleware.image.single('photo'), perangkatDesaController.create);
router.put('/:id', multerMiddleware.image.single('photo'), perangkatDesaController.update);
router.delete('/:id', perangkatDesaController.delete);

module.exports = router;
