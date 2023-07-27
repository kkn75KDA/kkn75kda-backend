const router = require('express').Router();

const authRouter = require('./auth.route');
const assetRouter = require('./asset.route');
const pekerjaanRouter = require('./pekerjaan.route');
const perangkatDesaRouter = require('./perangkatDesa.route');
const statistikRouter = require('./statistik.route');

// eslint-disable-next-line arrow-body-style
router.get('/', (req, res) => {
  return res.status(200).json({
    status: true,
    message: 'Selamat Datang di API Desa Koncer Darul Aman!',
  });
});

router.use('/auth', authRouter);
router.use('/asset', assetRouter);
router.use('/pekerjaan', pekerjaanRouter);
router.use('/perangkat-desa', perangkatDesaRouter);
router.use('/statistik', statistikRouter);

module.exports = router;
