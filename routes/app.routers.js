const express = require('express')
const cartRoute = require('./cart/cart.routes')
const productRoute = require('./products/products.routes')
const error = require('./error/error.routes')
const loginRoute = require('./login/login.routes')
const router = express.Router();

router.use('/cart', cartRoute)
router.use('/products', productRoute)
router.use('/', loginRoute)
router.use('*', error)

module.exports = router