const router = require('express').Router();

const pekerjaanController = require('../controllers/pekerjaan.controller');

router.get('/', pekerjaanController.getAll);

module.exports = router;
