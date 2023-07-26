const router = require('express').Router();

const authRouter = require('./auth.route');
const pekerjaanRouter = require('./pekerjaan.route');
const statistikRouter = require('./statistik.route');

// eslint-disable-next-line arrow-body-style
router.get('/', (req, res) => {
  return res.status(200).json({
    status: true,
    message: 'Selamat Datang di API Desa Koncer Darul Aman!',
  });
});

router.use('/auth', authRouter);
router.use('/pekerjaan', pekerjaanRouter);
router.use('/statistik', statistikRouter);

module.exports = router;
