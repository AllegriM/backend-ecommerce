const express = require('express')
const router = express.Router()
const carritosControllers = require('../../controllers/carritos.controllers')
const logger = require('../../middlewares/logs.middleware')
const CarritosMongoDao = require('../../models/daos/carritos/carritos.mongo.dao')

const Cart = new CarritosMongoDao();

// router.get('/', async (req, res) => {
//     const cartId = req.user.cart;
//     try {
//         const cart = await Cart.getByIdAndPopulate(cartId);
//         if (!cart) {
//             res.send('This item is already on your cart.');
//         }
//         res.render('cart/cart.hbs', { cart });
//     } catch (error) {
//         logger.error(error);
//     }
// });

router.get('/', carritosControllers.getAll);
router.get('/:id/carritos', carritosControllers.getCarritoById)
router.post('/', carritosControllers.saveCarrito)
router.post('/:id/carritos', carritosControllers.updateCarrito)
router.delete('/:id', carritosControllers.deleteCarrito)

module.exports = router