const router = require('express').Router();

const agendaController = require('../controllers/agenda.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', agendaController.getAll);
router.post('/', authMiddleware, agendaController.create);
router.put('/:id', authMiddleware, agendaController.update);
router.delete('/:id', authMiddleware, agendaController.delete);

module.exports = router;
