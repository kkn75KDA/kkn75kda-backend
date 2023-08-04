const router = require('express').Router();

const authRouter = require('./auth.route');
const artikelRouter = require('./artikel.route');
const assetRouter = require('./asset.route');
const pekerjaanRouter = require('./pekerjaan.route');
const pendudukRouter = require('./penduduk.route');
const perangkatDesaRouter = require('./perangkatDesa.route');
const statistikRouter = require('./statistik.route');
const tagRouter = require('./tag.route');

// eslint-disable-next-line arrow-body-style
router.get('/', (req, res) => {
  return res.status(200).json({
    status: true,
    message: 'Selamat Datang di API Desa Koncer Darul Aman!',
  });
});

router.use('/auth', authRouter);
router.use('/artikel', artikelRouter);
router.use('/asset', assetRouter);
router.use('/pekerjaan', pekerjaanRouter);
router.use('/penduduk', pendudukRouter);
router.use('/perangkat-desa', perangkatDesaRouter);
router.use('/statistik', statistikRouter);
router.use('/tag', tagRouter);

module.exports = router;
