const ProductsDao = require('../models/daos/productos/productos.mongo.dao');
const Product = new ProductsDao();

class ProductsServices {
    async create(userItem) {
        const product = {
            title: userItem.title.trim(),
            price: userItem.price.trim(),
            image: userItem.image.trim(),
            stock: userItem.stock.trim(),
        }
        return await Product.save(product);
    }

    async getAll() {
        return await Product.getAll();
    }

    async getById(id) {
        return await Product.getById(id);
    }

    async update(id, payload) {
        return await Product.update(id, payload);
    }

    async delete(id) {
        return await Product.delete(id);
    }
}

module.exports = ProductsServices