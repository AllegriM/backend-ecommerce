const express = require('express')
const cartRoute = require('./cart/cart.routes')
const productRoute = require('./products/products.routes')
const router = express.Router();

router.use('/cart', cartRoute)
router.use('/products', productRoute)

module.exports = router