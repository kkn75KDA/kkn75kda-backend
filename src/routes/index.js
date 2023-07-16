const router = require('express').Router();

const authRouter = require('./auth.route');
const pekerjaanRouter = require('./pekerjaan.route');

// eslint-disable-next-line arrow-body-style
router.get('/', (req, res) => {
  return res.status(200).json({
    status: true,
    message: 'Selamat Datang di API Desa Koncer Darul Aman!',
  });
});

router.use('/auth', authRouter);
router.use('/pekerjaan', pekerjaanRouter);

module.exports = router;
