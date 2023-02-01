const express = require('express')
const cartRoute = require('./cart/cart.routes')
const productRoute = require('./products/products.routes')
const error = require('./error/error.routes')
const userRoute = require('./user/user.routes')
const infoRoute = require('./info/info.routes')
const logger = require('../middlewares/logs.middleware')
const { CarritosMongoDao } = require('../models/daos/carritos/carritos.mongo.dao')
const router = express.Router();

const Cart = new CarritosMongoDao();

router.get('/', async (req, res) => {
    console.log(req.user)
    try {
        logger.info('[GET] => /');
        const user = req.user;
        if (user) {
            res.render('home.hbs', { user });
        } else {
            res.render('signin.hbs');
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/profile', (req, res) => {
    const user = req.user;
    res.render('profile.hbs', { user });
});

router.get('/cart', async (req, res) => {
    const cartId = req.user.cart;
    try {
        const cart = await Cart.getByIdAndPopulate(cartId);
        if (!cart) {
            res.send('This item is already on your cart.');
        }
        logger.info(cart);
        res.render('carts/cart.hbs', { cart });
    } catch (error) {
        logger.error(error);
    }
});

router.use('/cart', cartRoute)
router.use('/products', productRoute)
router.use('/', userRoute)
router.use('/', infoRoute)
router.use('*', error)


module.exports = router