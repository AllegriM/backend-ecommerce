const FirebaseContainer = require("../../containers/firebase.container");

const collection = "carritos";

class CarritosFirebaseDao extends FirebaseContainer {
  constructor() {
    super(collection);
  }
}

module.exports = CarritosFirebaseDao;