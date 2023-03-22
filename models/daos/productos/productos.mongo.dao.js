const { Schema } = require('mongoose');
const MongoContainer = require("../../containers/mongo.container");

const collection = "products";

const ProductsSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  image: { type: String },
  stock: { type: Number },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  quantity: { type: Number, default: 1 },
});

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, ProductsSchema);
  }
}

module.exports = ProductsMongoDao;