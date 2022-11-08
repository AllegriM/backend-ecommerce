const { Schema } = require('mongoose');
const MongoContainer = require("../../containers/mongo.container");

const collection = "products";

const ProductsSchema = new Schema({
  titulo: { type: String },
  precio: { type: Number}, 
  imageUrl: { type: String },
  stock: { type: Number }
});

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, ProductsSchema);
  }
}

module.exports = ProductsMongoDao;