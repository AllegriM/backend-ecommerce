const express = require('express')
const cartRoute = require('./cart/cart.routes')
const productRoute = require('./products/products.routes')
const userRoute = require('./user/user.routes')
const infoRoute = require('./info/info.routes')
const chatRoute = require('./chat/chat.routes')
const logger = require('../middlewares/logs.middleware')
const CartsServices = require('../services/cart.service')
const { sendCheckoutEmail } = require('../middlewares/emailer.middleware');
const { ADMIN_EMAIL } = require('../config');
const isAuthenticated = require('../middlewares/auth.middleware')
const { graphqlHTTP } = require('express-graphql')
const GraphQLSchema = require('../graphql/schema')

const router = express.Router();

const Cart = new CartsServices();

router.use('/cart', isAuthenticated, cartRoute)
router.use('/products', isAuthenticated, productRoute)
router.use('/', infoRoute)
router.use('/', userRoute)
router.use('/chat', isAuthenticated, chatRoute)

router.use('/graphql', graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: true
}))

router.get('/', (req, res) => {
    try {
        logger.info('[GET] => /');
        const user = req.user;
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
    try {
        const cart = await Cart.getById(cartId)
        await Cart.update(cartId, { items: [] });
        await sendCheckoutEmail(req.user, cart.items, ADMIN_EMAIL);
        res.send('Su pedido fue procesado de forma exitosa.');
    } catch (error) {
        logger.error(error);
    }
});

module.exports = router