const { Schema, default: mongoose } = require('mongoose');
const MongoContainer = require("../../containers/mongo.container");

const collection = "users";

const UsersSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  email: { type: String, unique: true },
  password: { type: String } 
});

const Users = mongoose.model(collection, UsersSchema);

module.exports = Users;