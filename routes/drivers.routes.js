const router = require('express').Router();
const drivers = require('../controllers/driversController');

router.get('/', drivers.list);
router.get('/:driverId', drivers.getById);

module.exports = router;
