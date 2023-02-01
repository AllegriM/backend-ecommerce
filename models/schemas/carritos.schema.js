const { Schema, default: mongoose } = require('mongoose');

const collection = "carritos";

const productSchema = new Schema(
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
        items: [productSchema],
        subTotal: {
            default: 0,
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const carritos = mongoose.model(collection, carritosSchema);

module.exports = carritos;