const router = require('express').Router();

const artikelController = require('../controllers/artikel.controller');

router.get('/', artikelController.getAll);
router.get('/:id', artikelController.getById);
router.post('/', artikelController.create);
router.put('/:id', artikelController.update);
router.delete('/:id', artikelController.delete);

module.exports = router;
