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
  category: { type: String },
  quantity: { type: Number, default: 1 },
});

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, ProductsSchema);
  }

  async getByCategory(category) {
    const products = await this.model.find({ category });
    if (!products) {
      return null;
    }
    return products;
  }
}

module.exports = ProductsMongoDao;