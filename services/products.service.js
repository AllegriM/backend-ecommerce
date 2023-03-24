const ProductsDao = require('../models/daos/productos/productos.mongo.dao');
const Product = new ProductsDao();

class ProductsServices {
    async create(userItem) {
        const product = {
            title: userItem.title.trim(),
            price: userItem.price.trim(),
            image: userItem.image.trim(),
            category: userItem.category.toLowerCase().trim(),
            stock: userItem.stock.trim(),
            quantity: 1,
            creatorId: userItem.creatorId,
        }
        return await Product.save(product);
    }

    async getAll() {
        return await Product.getAll();
    }

    async getByCategory(category) {
        return await Product.getByCategory(category);
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