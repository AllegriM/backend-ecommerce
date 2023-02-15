const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email'],
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String },
    age: { type: Number },
    phone: { type: Number },
    image: { type: String },
    cart: { type: Schema.Types.ObjectId, ref: 'carritos' },
    createdAt: { type: Date },
    updatedAt: { type: Date },
});

UsersSchema.index({ email: 1 });

module.exports = UsersSchema;