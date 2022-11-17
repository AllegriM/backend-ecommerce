const envConfig = require('../config');
const firebaseConfig = require('./firebase/firebase.config.json');

module.exports = {
  files: {
    products: "../class/products",
    cart: "../class/cart"
  },
  mongodb: {
    uri: `mongodb+srv://elmonky:${envConfig.DB_PASSWORD}@eventos.of0cfsb.mongodb.net/?retryWrites=true&w=majority`
  },
  firebase: {
    credentials: firebaseConfig
  },
}