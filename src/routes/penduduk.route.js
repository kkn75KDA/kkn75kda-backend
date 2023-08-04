const router = require('express').Router();

const pendudukController = require('../controllers/penduduk.controller');

router.get('/', pendudukController.getAll);
router.get('/:noKK', pendudukController.getByKK);
router.post('/', pendudukController.create);

module.exports = router;
