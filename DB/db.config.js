const envConfig = require('../config');
const firebaseConfig = require('./firebase/firebase.config.json');

module.exports = {
  mongodb: {
    uri: `mongodb+srv://elmonky:${envConfig.DB_PASSWORD}@coderhouse.ihv7cd0.mongodb.net/?retryWrites=true&w=majority`
  },
  firebase: {
    credentials: firebaseConfig
  },
}