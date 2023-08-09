const router = require('express').Router();

const assetController = require('../controllers/asset.controller');

router.get('/', assetController.getAll);
router.post('/', assetController.create);
router.put('/:id', assetController.update);
router.delete('/:id', assetController.delete);

module.exports = router;
