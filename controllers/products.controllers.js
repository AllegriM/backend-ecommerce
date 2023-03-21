const { HTTP_STATUS } = require("../constants/api.constants");
const logger = require("../middlewares/logs.middleware");
const productsService = require('../services/products.service')
const defaultProducts = require('../data/products')
const { successResponse } = require("../utils/api.utils");
const CartsServices = require("../services/cart.service");

const Products = new productsService()
const Cart = new CartsServices()
class ProductsController {

  async getProducts(req, res, next) {
    try {
      const products = await Products.getAll();
      if (req.email) {
        let content = products.length;
        let boolean = content.length !== 0;
        return res.render("home.hbs", {
          list: products,
          showList: boolean,
          user: req.email,
        });
      }
      logger.info('[get] => /products');
      return res.render("products.hbs", { products })
    }
    catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Products.getById(id);
      logger.info('[get] => /products/:id');
      return res.render("products/show.hbs", { product })
    }
    catch (error) {
      next(error);
    }
  }

  async saveProduct(req, res, next) {
    try {
      const product = {
        timestamp: new Date(),
        ...req.body,
      };
      const newProduct = await Products.create(product);
      const response = successResponse(newProduct);
      logger.info('[post] => /products');
      return res.status(HTTP_STATUS.CREATED).json(response);
    }
    catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params;
    try {
      const updateProduct = await Products.update(id, req.body);
      const response = successResponse(updateProduct);
      logger.info('[put] => /products/:id');
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const deletedProduct = await Products.delete(id);
      const response = successResponse(deletedProduct);
      logger.info('[del] => /products/:id');
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch (error) {
      next(error);
    }
  }

  async addProductToCart(req, res, next) {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const cartId = req.user.cart._id.toString();
      const product = await Products.getById(id);
      await Cart.addItemToCart(cartId, product, +quantity);
      res.redirect('/cart');
    }
    catch (error) {
      next(error);
    }
  }

}

module.exports = new ProductsController();