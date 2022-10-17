const productList = []

let id = 0

class Products {
    static getAllProducts() {
        return productList;
    }
    static getProductByID(id) {
        const product = productList.find(item => item.id === +id)
        return product
    }
    static addProduct(bodyProduct) {
        const newProduct = {
            id: ++id,
            timestamp: Date.now(),
            name: bodyProduct.name,
            description: bodyProduct.description,
            code: bodyProduct.code,
            image: bodyProduct.image,
            price: bodyProduct.price,
            stock: bodyProduct.stock
        }
        productList.push(newProduct)
        return productList
    }
    static updateProduct(id, bodyProduct) {
        const productToUpdate = productList.find(product => product.id === +id)
        if (productToUpdate) {
            productToUpdate.timestamp = Date.now(),
                productToUpdate.name = bodyProduct.name,
                productToUpdate.description = bodyProduct.description,
                productToUpdate.code = bodyProduct.code,
                productToUpdate.image = bodyProduct.image,
                productToUpdate.price = bodyProduct.price,
                productToUpdate.stock = bodyProduct.stock
        }
        return productToUpdate
    }
    static deleteProduct(id) {
        const selectedProduct = productList.find(product => product.id !== +id)
        if (!selectedProduct) return new Error('Product does not exist!')
        const newProductList = productList.filter(product => product.id !== +id)
        return newProductList;
    }

}

module.exports = Products