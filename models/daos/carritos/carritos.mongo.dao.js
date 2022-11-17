const { Schema } = require('mongoose');
const MongoContainer = require("../../containers/mongo.container");

const collection = "carritos";

const carritosSchema = new Schema({
  nombre: { type: String },
  email: { type: String, unique: true },
  website: { type: String },
  image: { type: String }
});

class CarritosMongoDao extends MongoContainer {
  constructor() {
    super(collection, carritosSchema);
  }

  async addProductToCart(cartId, productId) {
    try {
      const updatedProductsToCart = await this.model.findByIdAndUpdate(cartId, {
        $push: {
          products: [productId],
        },
      });
      return updatedProductsToCart;
    } catch (error) {
      console.log(error.message);
    }
  }
  async removeProductFromCart(cartId, productId) {
    try {
      const updatedProductsToCart = await this.model.findByIdAndUpdate(cartId, {
        $pull: {
          products: [productId],
        },
      });
      return updatedProductsToCart;
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = CarritosMongoDao;