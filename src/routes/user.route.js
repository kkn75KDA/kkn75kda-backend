const router = require('express').Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, userController.getUser);

module.exports = router;
