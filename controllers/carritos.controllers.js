const { HTTP_STATUS } = require("../constants/api.constants");
const logger = require("../middlewares/logs.middleware");
const { CarritosDao } = require("../models/daos/app.daos");
const { successResponse } = require("../utils/api.utils");

const carritosDao = new CarritosDao();

class CarritosController {

  async getAll(req, res, next) {
    try {
      const carritos = await carritosDao.getAll();
      const response = successResponse(carritos);
      logger.info('[get] => /cart');
      res.status(HTTP_STATUS.OK).json(response);
    }
    catch (error) {
      next(error);
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

}

module.exports = new CarritosController();