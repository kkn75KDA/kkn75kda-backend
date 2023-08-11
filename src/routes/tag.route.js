const router = require('express').Router();

const tagController = require('../controllers/tag.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', tagController.getAll);
router.post('/', authMiddleware, tagController.create);
router.put('/:id', authMiddleware, tagController.update);
router.delete('/:id', authMiddleware, tagController.delete);

module.exports = router;
