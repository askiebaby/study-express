const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', productsController.getAll);

router.get('/:productId', productsController.get);

router.post('/', productsController.post);

router.put('/:productId', productsController.put);

router.delete('/:productId', productsController.remove);

module.exports = router;
