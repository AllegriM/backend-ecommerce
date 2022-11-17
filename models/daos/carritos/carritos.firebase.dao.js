const FirebaseContainer = require("../../containers/firebase.container");

const collection = "carritos";

class CarritosFirebaseDao extends FirebaseContainer {
  constructor() {
    super(collection);
  }
  async save() {
    const docRef = this.query.doc();
    const products = [];
    return await docRef.set({
      products,
      timestamp: FieldValue.serverTimestamp(),
    });
  }

  async addProductToCart(cartId, productId) {
    const docRef = this.query.doc(cartId);
    if (!docRef) {
      const message =
        "Resource whith id " + cartId + "does not exist in our records.";
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return await docRef.update({ products: FieldValue.arrayUnion(productId) });
  }

  async removeProductFromCart(cartId, productId) {
    const docRef = this.query.doc(cartId);
    if (!docRef) {
      const message = `Resource with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return await docRef.update({ products: FieldValue.arrayRemove(productId) });
  }
}

module.exports = CarritosFirebaseDao;