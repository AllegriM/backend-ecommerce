const { HTTP_STATUS } = require("../constants/api.constants");
const logger = require("../middlewares/logs.middleware");
const { ProductsDao } = require("../models/daos/app.daos");
const { successResponse } = require("../utils/api.utils");

const productsDao = new ProductsDao();

class ProductsController {

  async getProducts(req, res, next) {
    try {
      const products = await productsDao.getAll();
      if (req.email) {
        let content = products.length;
        let boolean = content.length !== 0;
        return res.render("index.hbs", {
          list: products,
          showList: boolean,
          user: req.email,
        });
      }
      logger.info('[get] => /products');
      return res.redirect("signin")
    }
    catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await productsDao.getById(id);
      const response = successResponse(product);
      logger.info('[get] => /products/:id');
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch (error) {
      next(error);
    }
  }

  async saveProduct(req, res, next) {
    try {
      const newProduct = await productsDao.save(req.body);
      const response = successResponse(newProduct);
      logger.info('[post] => /products');
      res.status(HTTP_STATUS.CREATED).render("index.hbs");
    }
    catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params;
    try {
      const updateProduct = await productsDao.update(id, req.body);
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
      const deletedProduct = await productsDao.delete(id);
      const response = successResponse(deletedProduct);
      logger.info('[del] => /products/:id');
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch (error) {
      next(error);
    }
  }

}

module.exports = new ProductsController();