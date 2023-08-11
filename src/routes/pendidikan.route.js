const router = require('express').Router();

const pendidikanController = require('../controllers/pendidikan.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', pendidikanController.getAll);
router.post('/', authMiddleware, pendidikanController.create);
router.put('/:id', authMiddleware, pendidikanController.update);
router.delete('/:id', authMiddleware, pendidikanController.delete);

module.exports = router;
