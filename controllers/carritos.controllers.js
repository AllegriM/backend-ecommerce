const { HTTP_STATUS } = require("../constants/api.constants");
const logger = require("../middlewares/logs.middleware");
const { CarritosDao } = require("../models/daos/app.daos");
const { successResponse } = require("../utils/api.utils");
const { CarritosMongoDao } = require('../models/daos/carritos/carritos.mongo.dao')

const Cart = new CarritosMongoDao();
const carritosDao = new CarritosDao();

class CarritosController {

  async getAll(req, res, next) {
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
  }

  async getCarritoById(req, res, next) {
    const { id } = req.params;
    try {
      const carrito = await carritosDao.getById(id);
      const response = successResponse(carrito);
      logger.info('[get] => /cart/:id');
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch (error) {
      next(error);
    }
  }

  async saveCarrito(req, res, next) {
    try {
      const newCarrito = await carritosDao.save(req.body);
      const response = successResponse(newCarrito);
      logger.info('[post] => /cart');
      res.status(HTTP_STATUS.CREATED).json(response);
    }
    catch (error) {
      next(error);
    }
  }

  async updateCarrito(req, res, next) {
    const { id } = req.params;
    try {
      const updateCarrito = await carritosDao.update(id, req.body);
      const response = successResponse(updateCarrito);
      logger.info('[put] => /cart/:id');
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch (error) {
      next(error);
    }
  }

  async deleteCarrito(req, res, next) {
    const { id } = req.params;
    try {
      const deletedCarrito = await carritosDao.delete(id);
      const response = successResponse(deletedCarrito);
      logger.info('[del] => /cart/:id');
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch (error) {
      next(error);
    }
  }

  async getCartProducts(req, res, next) {
    const { id } = req.params;
    try {
      const cartProducts = await cartsDao.getProducts(id);
      return cartProducts;
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req, res, next) {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    try {
      const updatedCart = await cartsDao.addItemToCart(cartId, productId, quantity);
      if (!updatedCart) {
        res.send('This item is already on your cart.');
      }

      res.redirect('/cart');
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    const { cartId, productId } = req.params;
    try {
      const updatedCart = await cartsDao.removeProduct(cartId, productId);
      const response = successResponse(updatedCart);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

}

module.exports = new CarritosController();