const router = require('express').Router();

const perangkatDesaController = require('../controllers/perangkatDesa.controller');

router.get('/', perangkatDesaController.getAll);
router.put('/:id', perangkatDesaController.updatePerangkat);

module.exports = router;
