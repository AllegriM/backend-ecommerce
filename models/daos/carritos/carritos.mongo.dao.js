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

  async addProductToCart(idCarrito, idProducto) {
  
    this.model.updateOne({ _id: idCarrito }, {
      $push: {
        productos: [idProducto]
      }
    })
  }
}

module.exports = CarritosMongoDao;