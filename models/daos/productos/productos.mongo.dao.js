const { Schema } = require('mongoose');
const MongoContainer = require("../../containers/mongo.container");

const collection = "products";

const ProductsSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  timestamp: { type: Date, default: Date.now },
  title: { type: String },
  description: { type: String },
  code: { type: Number },
  img: { type: String },
  price: { type: Number },
  stock: { type: Number },
});

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, ProductsSchema);
  }
}

module.exports = ProductsMongoDao;