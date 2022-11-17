const fs = require("fs");

class FileContainer {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async getById(id) {
        try {
            let products = await this.getAll();

            let prodById = products.find((product) => product.id == id);
            prodById == undefined ? (prodById = null) : prodById;
            return prodById;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            let fileToRead = await fs.promises.readFile(
                `./${this.fileName}`,
                "utf-8"
            );
            let products = JSON.parse(fileToRead);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            let products = await this.getAll();

            let prodById = products.filter((product) => product.id !== +id);

            await fs.promises.writeFile(
                `./${this.fileName}`,
                JSON.stringify(prodById)
            );
            return prodById;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            let products = [];
            await fs.promises.writeFile(
                `./${this.fileName}`,
                JSON.stringify(products)
            );
        } catch (error) {
            console.log(error);
        }
    }

    async update(productId, item) {
        const { name, description, price, code, stock, image } = item;
        const productsList = await this.getAll();
        const productIndex = productsList.findIndex(
            (product) => product.id === +productId
        );
        const updatedProduct = {
            id: null,
            timestamp: Date.now(),
            name,
            description,
            price: +price,
            code: +code,
            stock: +stock,
            image,
        };

        try {
            let products = await this.getAll();
            products[productIndex] = updatedProduct;
            await fs.promises.writeFile(
                `./${this.fileName}`,
                JSON.stringify(products)
            );
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = FileContainer;