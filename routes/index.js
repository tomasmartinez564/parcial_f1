const router = require('express').Router();

router.use('/drivers', require('./drivers.routes'));
router.use('/favorites', require('./favorites.routes'));

module.exports = router;
