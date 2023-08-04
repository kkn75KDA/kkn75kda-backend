const router = require('express').Router();

const tagController = require('../controllers/tag.controller');

router.get('/', tagController.getAll);
router.get('/:id', tagController.getById);
router.post('/', tagController.create);
router.put('/:id', tagController.update);
router.delete('/:id', tagController.delete);

module.exports = router;
