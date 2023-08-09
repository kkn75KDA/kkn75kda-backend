const router = require('express').Router();

const agendaController = require('../controllers/agenda.controller');

router.get('/', agendaController.getAll);
router.post('/', agendaController.create);
router.put('/:id', agendaController.update);
router.delete('/:id', agendaController.delete);

module.exports = router;
