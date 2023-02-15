const CartsDao = require('../models/daos/carritos/carritos.mongo.dao');

const Cart = new CartsDao()

class CartsServices {

    async createCart() {
        return await Cart.save({ items: [] });
    };

    async getAll() {
        return await Cart.getAll();
    }

    async getById(id) {
        return await Cart.getById(id);
    }

    async save(cart) {
        return await Cart.save(cart);
    }

    async update(id, payload) {
        return await Cart.update(id, payload);
    }

    async delete(id) {
        return await Cart.delete(id);
    }

    async addItemToCart(cartId, productId, quantity) {
        const cart = await Cart.getById({ _id: cartId }, { __v: 0 });

        if (cart) {
            const cartItem = {
                productId,
                quantity,
            };
            if (cart.items.some((item) => item.productId == cartItem.productId)) {
                return false;
            }
            const updatedCart = await Cart.addProductToCart(cartId, cartItem);
            return updatedCart;
        }

        const message = `Cart with id ${cartId} does not exist in our records.`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    };

    async removeItemFromCart(cartId, itemId) {
        const cart = await Cart.getById({ _id: cartId }, { __v: 0 });

        if (cart) {
            const updatedCart = await Cart.removeProductFromCart(cartId, itemId);
            return updatedCart;
        }
        const message = `Cart with id ${cartId} does not exist in our records.`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    };
}


module.exports = CartsServices;