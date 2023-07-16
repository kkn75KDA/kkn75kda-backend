const router = require('express').Router();

// eslint-disable-next-line arrow-body-style
router.get('/', (req, res) => {
  return res.status(200).json({
    status: true,
    message: 'Selamat Datang di API Desa Koncer Darul Aman!',
  });
});

module.exports = router;
