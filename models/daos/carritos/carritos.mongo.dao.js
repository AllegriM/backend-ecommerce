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

  async addProductToCart(cartId, product, quantity) {
    console.log(product, quantity)
    try {
      const cart = await this.model.findById(cartId);
      console.log(cart)
      console.log(cart.items.map((item) => item.price).reduce((a, b) => a + b, 0))
      const addProductToCart = await this.model.findByIdAndUpdate(cartId, {
        $push: {
          items: {
            productId: product._id,
            quantity: quantity,
            price: product.price * quantity,
            title: product.title,
            stock: product.stock - quantity,
            image: product.image,
          },
          subtotal: cart.items.map((item) => item.price).reduce((a, b) => a + b, 0)
        },
      });
      return addProductToCart;
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

module.exports = CarritosMongoDao