const envConfig = require("../../config");

let ProductsDao;
let CarritosDao;

switch(envConfig.DATASOURCE) {
  case 'mongo':
    ProductsDao = require('./productos/productos.mongo.dao');
    CarritosDao = require('./carritos/carritos.mongo.dao');
    break;
  case 'firebase':
    ProductsDao = require('./productos/productos.firebase.dao');
    CarritosDao = require('./carritos/carritos.firebase.dao');
    break
  default:
    throw new Error("Invalid Datasource");
}

module.exports = {
  ProductsDao,
  CarritosDao
}