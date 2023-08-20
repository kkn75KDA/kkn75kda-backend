const router = require('express').Router();

const pekerjaanController = require('../controllers/pekerjaan.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', pekerjaanController.getAll);
router.post('/', authMiddleware, pekerjaanController.create);
router.put('/:id', authMiddleware, pekerjaanController.update);
router.delete('/:id', authMiddleware, pekerjaanController.delete);

module.exports = router;
