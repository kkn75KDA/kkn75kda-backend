const router = require('express').Router();

const pekerjaanController = require('../controllers/pekerjaan.controller');

router.get('/', pekerjaanController.getAll);
router.post('/', pekerjaanController.create);
router.put('/:id', pekerjaanController.update);
router.delete('/:id', pekerjaanController.delete);

module.exports = router;
