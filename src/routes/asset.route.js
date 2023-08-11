const router = require('express').Router();

const assetController = require('../controllers/asset.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', assetController.getAll);
router.post('/', authMiddleware, assetController.create);
router.put('/:id', authMiddleware, assetController.update);
router.delete('/:id', authMiddleware, assetController.delete);

module.exports = router;
