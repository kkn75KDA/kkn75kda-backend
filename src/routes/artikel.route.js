const router = require('express').Router();

const artikelController = require('../controllers/artikel.controller');
const imageMiddleware = require('../middlewares/image.middleware');

router.get('/', artikelController.getAll);
router.get('/:id', artikelController.getById);
router.post('/', imageMiddleware.image.single('thumbnail'), artikelController.create);
router.put('/:id', imageMiddleware.image.single('thumbnail'), artikelController.update);
router.delete('/:id', artikelController.delete);

module.exports = router;
