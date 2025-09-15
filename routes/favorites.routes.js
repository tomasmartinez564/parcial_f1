const router = require('express').Router();
const fav = require('../controllers/favoritesController');

router.get('/', fav.list);
router.post('/', fav.create);
router.get('/:id', fav.getOne);
router.put('/:id', fav.update);
router.delete('/:id', fav.remove);

module.exports = router;
