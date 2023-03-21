const { Schema } = require('mongoose');

const productSchema = new Schema(
    {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'products',
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1.'],
        },
        image: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1.'],
        }
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

module.exports = { carritosSchema, productSchema };