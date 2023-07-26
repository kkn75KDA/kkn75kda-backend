const router = require('express').Router();

const statistikController = require('../controllers/statistik.controller');

router.get('/:type', statistikController.statistik);

module.exports = router;
