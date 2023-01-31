const { Schema } = require('mongoose');
const MongoContainer = require("../../containers/mongo.container");

const collection = "carritos";

const itemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1.'],
    },
  },
  {
    timestamps: true,
  }
);

const carritosSchema = new Schema(
  {
    items: [itemSchema],
    subTotal: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

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