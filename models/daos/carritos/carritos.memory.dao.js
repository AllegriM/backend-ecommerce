const MemoryContainer = require("../../containers/memory.container");

class CartMemoryDao extends MemoryContainer {
    constructor() {
        super(resource);
    }
    async save(newCart) {
        const { productsId } = req.params;
        const newCart = {
            id: newId,
            timestamp: Date.now(),
            products: [productsId],
        };
    }

    async addProductToCart(cartId, productId) {
        const { cartId, productId } = req.params;
        const indexForAdd = cart.findIndex((cart) => cart.id === cartId);
        const productCart = cart.products.find(
            (product) => product.id === productId
        );
        cart[indexForAdd] = cart.products.push(productCart);
        return await productCart;
    }

    async removeProductFromCart(cartId, productId) {
        const { cartId, productId } = req.params;
        const cartIndex = cart.findIndex((cart) => cart.id === cartId);
        const productCart = cart.products.find(
            (product) => product.id === productId
        );
    }
}

module.exports = CartMemoryDao;