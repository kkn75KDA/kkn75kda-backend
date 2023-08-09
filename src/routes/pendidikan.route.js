const router = require('express').Router();

const pendidikanController = require('../controllers/pendidikan.controller.');

router.get('/', pendidikanController.getAll);
router.post('/', pendidikanController.create);
router.put('/:id', pendidikanController.update);
router.delete('/:id', pendidikanController.delete);

module.exports = router;
