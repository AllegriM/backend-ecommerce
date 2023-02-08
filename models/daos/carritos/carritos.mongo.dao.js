const logger = require("../../../middlewares/logs.middleware");
const MongoContainer = require("../../containers/mongo.container");
const { carritosSchema } = require("../../schemas/carritos.schema");

const collection = "carritos";

class CarritosMongoDao extends MongoContainer {
  constructor() {
    super(collection, carritosSchema);
  }

  async getByIdAndPopulate(id) {
    const cart = await this.model.findOne({ _id: id }, { __v: 0 }).populate('items.productId').lean();
    logger.info(cart);
    return cart;
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

module.exports = {
  CarritosMongoDao,
};