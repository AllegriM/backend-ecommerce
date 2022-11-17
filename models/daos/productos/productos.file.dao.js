const FileContainer = require("../../containers/file.container");

class ProductsFileDao extends FileContainer {
    constructor() {
        super("../../../DB/data/products.json");
    }
    async disconnet();
}

module.exports = ProductsFileDao;