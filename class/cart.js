
const cartList = []

class Cart {
    static createCart() {
        const newCart = {
            id: ++id,
            timestamp: Date.now(),
            products: []
        }
        cartList.push(newCart)
        return newCart.id
    }
    static getCartProducts(id) {
        const selectedCartProducts = cartList.find(cart => cart.id === +id)
        if (!selectedCartProducts) {
            return { error: "Carrito no encontrado!" }
        }
        else {
            return selectedCartProducts.products
        }
    }
    static addProductToCart(id, product) {
        const cartSelected = cartList.find(cart => cart.id === +id)
        if (!cartSelected) return undefined
        cartSelected.products.push(product)
    }
    static deleteCart(id) {
        const newCartArray = cartList.filter(cart => cart.id !== +id)
        return newCartArray
    }
    static deleteProductFromCart(id, prod_id) {
        const cart = cartList.find(cart => cart.id === +id);
        const newCartArray = cart.filter(item => item.id !== prod_id)
        return newCartArray
    }
}

module.exports = Cart