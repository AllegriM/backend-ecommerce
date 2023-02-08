const express = require('express')
const cartRoute = require('./cart/cart.routes')
const productRoute = require('./products/products.routes')
const error = require('./error/error.routes')
const userRoute = require('./user/user.routes')
const infoRoute = require('./info/info.routes')
const logger = require('../middlewares/logs.middleware')
const { CarritosMongoDao } = require('../models/daos/carritos/carritos.mongo.dao')
const { sendCheckoutEmail } = require('../middlewares/emailer.middleware');
const { sendCheckoutWhatsapp, sendCheckoutSMS } = require('../middlewares/twilioMsg.middleware');
const { ADMIN_EMAIL, ADMIN_PHONE } = require('../config');
const isAuthenticated = require('../middlewares/auth.middleware')
const router = express.Router();

const Cart = new CarritosMongoDao();

router.use('/cart', isAuthenticated, cartRoute)
router.use('/products', isAuthenticated, productRoute)
router.use('/', infoRoute)
router.use('/', userRoute)

router.get('/', (req, res) => {
    try {
        logger.info('[GET] => /');
        const user = req.user;
        console.log(user)
        if (user) {
            res.render('home.hbs', { user });
        } else {
            res.redirect('signin')
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/checkout', async (req, res) => {
    const cartId = req.user.cart;
    const { email, phone } = req.user;
    try {
        const cart = await Cart.getByIdAndPopulate(cartId);
        await sendCheckoutEmail(req.user, cart, ADMIN_EMAIL);
        await sendCheckoutWhatsapp(email, ADMIN_PHONE);
        await sendCheckoutSMS(email, phone);
        res.send('Su pedido fue procesado de forma exitosa.');
    } catch (error) {
        logger.error(error);
    }
});

module.exports = router