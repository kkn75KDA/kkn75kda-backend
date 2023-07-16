const router = require('express').Router();

const pekerjaanController = require('../controllers/pekerjaan.controller');

router.post('/', pekerjaanController.addPekerjaan);

module.exports = router;
