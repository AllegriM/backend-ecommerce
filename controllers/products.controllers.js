const { HTTP_STATUS } = require("../constants/api.constants");
const logger = require("../middlewares/logs.middleware");
const productsService = require('../services/products.service')
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
      if (product) {
        logger.info('[get] => /products/:id');
        return res.render("products/show.hbs", { product })
      } else {
        return res.status(HTTP_STATUS.NOT_FOUND).json(successResponse({}))
      }
    }
    catch (error) {
      next(error);
    }
  }

  async saveProduct(req, res, next) {
    const { _id } = req.user;
    try {
      const product = {
        timestamp: new Date(),
        creatorId: _id,
        ...req.body,
      };
      await Products.create(product);
      logger.info('[post] => /products/new');
      return res.redirect('/products');
    }
    catch (error) {
      next(error);
    }
  }

  async getUpdate(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Products.getById(id);
      logger.info('[get] => /products/:id/update');
      return res.render("products/update.hbs", { product })
    }
    catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params;
    try {
      const productToUpdate = await Products.getById(id);
      if (!productToUpdate.creatorId) {
        return res.redirect('/products');
      }
      if (req.user._id.toString() === productToUpdate.creatorId.toString()) {
        await Products.update(id, req.body);
        logger.info('[put] => /products/:id');
        res.redirect('/products');
      }
    }
    catch (error) {
      next(error);
    }
  }

  async getDelete(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Products.getById(id);
      logger.info('[get] => /products/delete/:id');
      return res.render("products/delete.hbs", { product })
    }
    catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const productToDelete = await Products.getById(id);
      if (!productToDelete.creatorId) {
        return res.redirect('/products');
      }
      if (req.user._id.toString() === productToDelete.creatorId.toString()) {
        await Products.delete(id);
        logger.info('[del] => /products/:id');
        return res.redirect('/products');
      }
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

  async newProduct(req, res, next) {
    console.log(req.user)

    try {
      logger.info('[get] => /products/new');
      return res.render("products/new.hbs");
    }
    catch (error) {
      next(error);
    }
  }

  async getByCategory(req, res, next) {
    const { category } = req.params;
    try {

      const products = await Products.getByCategory(category.toLowerCase());
      logger.info('[get] => /products/category/:category');
      return res.render("products.hbs", { products, category })
    }
    catch (error) {
      next(error);
    }
  }

}

module.exports = new ProductsController();